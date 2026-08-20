import { expect, test } from "bun:test";
import { StaticTokenProvider } from "../auth/static.js";
import {
	ThreadsAuthenticationError,
	ThreadsServerError,
} from "../errors/errors.js";
import { FetchTransport } from "../transport/fetch-transport.js";
import type { FetchFn, RequestSpec } from "../transport/types.js";

function makeFetch(
	handler: (url: string, init?: RequestInit) => Response,
): FetchFn {
	return (input, init) => Promise.resolve(handler(String(input), init));
}

function makeTransport(fetchImpl: FetchFn) {
	return new FetchTransport({
		baseUrl: "https://graph.threads.net",
		apiVersion: "v1.0",
		auth: new StaticTokenProvider("tok123"),
		timeoutMs: 5000,
		retry: { maxRetries: 3, initialDelayMs: 1, maxDelayMs: 5 },
		fetchImpl,
	});
}

test("injects version prefix, access token and parses JSON", async () => {
	let captured = "";
	const transport = makeTransport(
		makeFetch((url) => {
			captured = url;
			return new Response(JSON.stringify({ id: "1", text: "hi" }), {
				status: 200,
			});
		}),
	);

	const result = await transport.request<{ id: string; text: string }>({
		method: "GET",
		path: "/123",
		params: { fields: "id,text" },
	});

	expect(result.id).toBe("1");
	expect(captured).toContain("/v1.0/123");
	expect(captured).toContain("access_token=tok123");
	expect(captured).toContain("fields=id%2Ctext");
});

test("does not inject token when tokenRequired is false", async () => {
	let captured = "";
	const transport = makeTransport(
		makeFetch((url) => {
			captured = url;
			return new Response(JSON.stringify({ html: "<div/>" }), { status: 200 });
		}),
	);

	await transport.request<{ html: string }>({
		method: "GET",
		path: "/oembed",
		params: { url: "https://threads.net/x" },
		tokenRequired: false,
	});

	expect(captured).not.toContain("access_token");
});

test("retries a 500 then succeeds", async () => {
	let calls = 0;
	const transport = makeTransport(
		makeFetch(() => {
			calls++;
			return calls === 1
				? new Response(
						JSON.stringify({ error: { message: "boom", code: 1 } }),
						{ status: 500 },
					)
				: new Response(JSON.stringify({ ok: true }), { status: 200 });
		}),
	);

	const result = await transport.request<{ ok: boolean }>({
		method: "GET",
		path: "/x",
	});
	expect(result.ok).toBe(true);
	expect(calls).toBe(2);
});

test("throws ThreadsAuthenticationError on 401 without retrying", async () => {
	let calls = 0;
	const transport = makeTransport(
		makeFetch(() => {
			calls++;
			return new Response(
				JSON.stringify({ error: { message: "expired", code: 190 } }),
				{
					status: 401,
				},
			);
		}),
	);

	const err = await transport
		.request<unknown>({ method: "GET", path: "/x" })
		.then(
			() => null,
			(e: unknown) => e,
		);
	expect(err).toBeInstanceOf(ThreadsAuthenticationError);
	expect(calls).toBe(1);
});

test("throws ThreadsServerError and exposes provider code / request id", async () => {
	const transport = makeTransport(
		makeFetch(
			() =>
				new Response(
					JSON.stringify({
						error: { message: "oops", code: 12, fbtrace_id: "trace-1" },
					}),
					{ status: 503 },
				),
		),
	);

	const err = await transport
		.request<unknown>({ method: "GET", path: "/x", versioned: false })
		.then(
			() => null,
			(e: unknown) => e,
		);
	expect(err).toBeInstanceOf(ThreadsServerError);
	if (err instanceof ThreadsServerError) {
		expect(err.providerCode).toBe(12);
		expect(err.requestId).toBe("trace-1");
		expect(err.retriable).toBe(true);
	}
});

test("redacts secrets from error body", async () => {
	const transport = makeTransport(
		makeFetch(
			() =>
				new Response(
					JSON.stringify({ error: { message: "bad", access_token: "sekret" } }),
					{ status: 400 },
				),
		),
	);

	const err = await transport
		.request<unknown>({ method: "GET", path: "/x" })
		.then(
			() => null,
			(e: unknown) => e,
		);
	const body = (err as ThreadsAuthenticationError).responseBody as Record<
		string,
		unknown
	>;
	expect((body.error as Record<string, unknown>).access_token).toBe(
		"[REDACTED]",
	);
});

test("unversioned token endpoints do not get a version prefix", async () => {
	let captured = "";
	const transport = makeTransport(
		makeFetch((url) => {
			captured = url;
			return new Response(
				JSON.stringify({ access_token: "long", expires_in: 500 }),
				{ status: 200 },
			);
		}),
	);

	await transport.request({
		method: "GET",
		path: "/refresh_access_token",
		versioned: false,
		tokenRequired: false,
	});
	expect(captured).toContain("/refresh_access_token");
	expect(captured).not.toContain("/v1.0/refresh_access_token");
});

test("authentication error triggers provider refresh and retries once", async () => {
	const spec: RequestSpec = { method: "GET", path: "/me" };
	let calls = 0;
	let refreshed = false;
	const auth = {
		getToken: () => "old",
		refresh: () => {
			refreshed = true;
		},
	};
	const fetchImpl = makeFetch(() => {
		calls++;
		if (calls === 1) {
			return new Response(
				JSON.stringify({ error: { message: "expired", code: 190 } }),
				{
					status: 401,
				},
			);
		}
		return new Response(JSON.stringify({ id: "me" }), { status: 200 });
	});

	const transport = new FetchTransport({
		baseUrl: "https://graph.threads.net",
		apiVersion: "v1.0",
		auth,
		timeoutMs: 5000,
		retry: { maxRetries: 3, initialDelayMs: 1, maxDelayMs: 5 },
		fetchImpl,
	});

	const result = await transport.request<{ id: string }>(spec);
	expect(refreshed).toBe(true);
	expect(calls).toBe(2);
	expect(result.id).toBe("me");
});
