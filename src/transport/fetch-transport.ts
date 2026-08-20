import type { TokenProvider } from "../auth/token-provider.js";
import type { Hooks, ResolvedConfig } from "../config.js";
import {
	classifyError,
	ThreadsAuthenticationError,
	ThreadsNetworkError,
	ThreadsParseError,
	ThreadsTimeoutError,
} from "../errors/errors.js";
import { delayFor, isRetriable } from "./retry.js";
import { buildFormBody, buildQueryString } from "./serialize.js";
import type { FetchFn, RequestSpec, ResponseSpec, Transport } from "./types.js";

export interface FetchTransportOptions {
	baseUrl: string;
	apiVersion: string;
	auth: TokenProvider;
	timeoutMs: number;
	retry: ResolvedConfig["retry"];
	hooks?: Hooks;
	fetchImpl?: FetchFn;
	userAgent?: string;
}

export class FetchTransport implements Transport {
	private readonly fetchImpl: FetchFn;

	constructor(private readonly opts: FetchTransportOptions) {
		this.fetchImpl = opts.fetchImpl ?? globalThis.fetch;
	}

	async request<T>(spec: RequestSpec): Promise<T> {
		return this.requestWithRetry<T>(spec, 0);
	}

	private async requestWithRetry<T>(
		spec: RequestSpec,
		retryCount: number,
	): Promise<T> {
		try {
			return await this.execute<T>(spec);
		} catch (err) {
			if (err instanceof ThreadsAuthenticationError && this.opts.auth.refresh) {
				await this.opts.auth.refresh();
				return this.execute<T>(spec);
			}
			if (isRetriable(err) && retryCount < this.opts.retry.maxRetries) {
				await new Promise((resolve) =>
					setTimeout(resolve, delayFor(retryCount + 1, this.opts.retry)),
				);
				return this.requestWithRetry<T>(spec, retryCount + 1);
			}
			throw err;
		}
	}

	private async execute<T>(spec: RequestSpec): Promise<T> {
		await this.opts.hooks?.onRequest?.(spec);

		const token =
			spec.tokenRequired === false
				? undefined
				: await this.opts.auth.getToken();
		const url = this.buildUrl(spec, token);

		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), this.opts.timeoutMs);
		let res: Response;
		try {
			res = await this.fetchImpl(url, {
				method: spec.method,
				headers: this.buildHeaders(spec),
				body: spec.body ? buildFormBody(spec.body) : undefined,
				signal: controller.signal,
			});
		} catch (cause) {
			clearTimeout(timer);
			if (controller.signal.aborted) throw new ThreadsTimeoutError();
			throw new ThreadsNetworkError(cause);
		}
		clearTimeout(timer);

		const rawBody = await res.text();
		let body: unknown;
		if (rawBody === "") {
			body = undefined;
		} else {
			try {
				body = JSON.parse(rawBody);
			} catch {
				throw new ThreadsParseError({ message: "response is not valid JSON" });
			}
		}

		const responseSpec: ResponseSpec = {
			status: res.status,
			headers: res.headers,
			body,
			rawBody,
		};
		await this.opts.hooks?.onResponse?.(responseSpec);

		if (!res.ok) throw classifyError(res.status, body);
		return body as T;
	}

	private buildUrl(spec: RequestSpec, token: string | undefined): string {
		const versionPrefix =
			spec.versioned === false ? "" : `${this.opts.apiVersion}/`;
		const base = new URL(this.opts.baseUrl);
		const path = `${versionPrefix}${spec.path.replace(/^\//, "")}`;
		const url = new URL(path, base);
		const params: Record<string, unknown> = {};
		if (spec.params)
			for (const [key, value] of Object.entries(spec.params))
				params[key] = value;
		if (token) params.access_token = token;
		url.search = buildQueryString(params);
		return url.toString();
	}

	private buildHeaders(spec: RequestSpec): Record<string, string> {
		const headers: Record<string, string> = {};
		if (this.opts.userAgent) headers["User-Agent"] = this.opts.userAgent;
		if (spec.body)
			headers["Content-Type"] = "application/x-www-form-urlencoded";
		return headers;
	}
}
