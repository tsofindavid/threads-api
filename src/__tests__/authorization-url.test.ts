import { expect, test } from "bun:test";
import {
	buildAuthorizationUrl,
	parseAuthorizationRedirect,
} from "../auth/index.js";
import { ThreadsAPIError } from "../errors/errors.js";

test("builds the authorization window URL with required params", () => {
	const url = buildAuthorizationUrl({
		clientId: "990602627938098",
		redirectUri: "https://example.com/auth/",
		scope: "threads_basic",
	});

	const parsed = new URL(url);
	expect(parsed.origin + parsed.pathname).toBe(
		"https://threads.net/oauth/authorize",
	);
	expect(parsed.searchParams.get("client_id")).toBe("990602627938098");
	expect(parsed.searchParams.get("redirect_uri")).toBe(
		"https://example.com/auth/",
	);
	expect(parsed.searchParams.get("scope")).toBe("threads_basic");
	expect(parsed.searchParams.get("response_type")).toBe("code");
	expect(parsed.searchParams.has("state")).toBe(false);
});

test("joins an array of scopes and includes optional state", () => {
	const url = buildAuthorizationUrl({
		clientId: "1",
		redirectUri: "https://example.com/auth/",
		scope: ["threads_basic", "threads_content_publish"],
		state: "csrf-token",
	});

	const parsed = new URL(url);
	expect(parsed.searchParams.get("scope")).toBe(
		"threads_basic,threads_content_publish",
	);
	expect(parsed.searchParams.get("state")).toBe("csrf-token");
});

test("throws when clientId or redirectUri is missing", () => {
	expect(() =>
		buildAuthorizationUrl({
			clientId: "",
			redirectUri: "https://example.com/auth/",
			scope: "threads_basic",
		}),
	).toThrow(ThreadsAPIError);
});

test("parses a successful redirect into code and state", () => {
	const result = parseAuthorizationRedirect(
		"https://example.com/auth/?code=AQBx-hBsH3&state=csrf-token#_",
	);
	expect(result).toEqual({ ok: true, code: "AQBx-hBsH3", state: "csrf-token" });
});

test("parses a canceled redirect into an error result", () => {
	const result = parseAuthorizationRedirect(
		"https://example.com/auth/?error=access_denied&error_reason=user_denied&error_description=The+user+denied+your+request",
	);
	expect(result).toEqual({
		ok: false,
		error: "access_denied",
		errorReason: "user_denied",
		errorDescription: "The user denied your request",
	});
});

test("throws when the redirect has neither code nor error", () => {
	expect(() => parseAuthorizationRedirect("https://example.com/auth/")).toThrow(
		ThreadsAPIError,
	);
});
