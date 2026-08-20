import type { TokenProvider } from "./auth/token-provider.js";
import type { FetchFn, RequestSpec, ResponseSpec } from "./transport/types.js";

export const DEFAULT_BASE_URL = "https://graph.threads.net";
export const DEFAULT_API_VERSION = "v1.0";
export const DEFAULT_TIMEOUT_MS = 30_000;

export interface RetryOptions {
	maxRetries?: number;
	initialDelayMs?: number;
	maxDelayMs?: number;
}

export interface Hooks {
	onRequest?: (spec: RequestSpec) => void | Promise<void>;
	onResponse?: (spec: ResponseSpec) => void | Promise<void>;
}

export interface ThreadsConfig {
	auth?: TokenProvider;
	accessToken?: string;
	baseUrl?: string;
	apiVersion?: string;
	timeoutMs?: number;
	retry?: RetryOptions;
	hooks?: Hooks;
	fetch?: FetchFn;
}

export interface ResolvedConfig {
	baseUrl: string;
	apiVersion: string;
	timeoutMs: number;
	retry: Required<RetryOptions>;
}

export function resolveRetry(retry?: RetryOptions): Required<RetryOptions> {
	return {
		maxRetries: retry?.maxRetries ?? 3,
		initialDelayMs: retry?.initialDelayMs ?? 200,
		maxDelayMs: retry?.maxDelayMs ?? 8000,
	};
}
