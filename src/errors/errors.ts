import type { ResponseSpec } from "../transport/types.js";

const SECRET_KEY = /(token|secret|password|authorization)/i;

export interface ThreadsAPIErrorOptions {
	message: string;
	status?: number;
	providerCode?: string | number;
	requestId?: string;
	responseBody?: unknown;
	retriable?: boolean;
	cause?: unknown;
}

export class ThreadsAPIError extends Error {
	readonly status?: number;
	readonly providerCode?: string | number;
	readonly requestId?: string;
	readonly responseBody?: unknown;
	readonly retriable: boolean;

	constructor(opts: ThreadsAPIErrorOptions) {
		super(
			opts.message,
			opts.cause === undefined ? undefined : { cause: opts.cause },
		);
		this.name = new.target.name;
		this.status = opts.status;
		this.providerCode = opts.providerCode;
		this.requestId = opts.requestId;
		this.responseBody = opts.responseBody;
		this.retriable = opts.retriable ?? false;
	}
}

export class ThreadsNetworkError extends ThreadsAPIError {
	constructor(cause: unknown) {
		super({
			message: cause instanceof Error ? cause.message : String(cause),
			retriable: true,
			cause,
		});
	}
}

export class ThreadsTimeoutError extends ThreadsAPIError {
	constructor() {
		super({ message: "request timed out", retriable: true });
	}
}

export class ThreadsAuthenticationError extends ThreadsAPIError {
	constructor(opts: ThreadsAPIErrorOptions) {
		super({ ...opts, retriable: false });
	}
}

export class ThreadsPermissionError extends ThreadsAPIError {
	constructor(opts: ThreadsAPIErrorOptions) {
		super({ ...opts, retriable: false });
	}
}

export class ThreadsRateLimitError extends ThreadsAPIError {
	constructor(opts: ThreadsAPIErrorOptions) {
		super({ ...opts, retriable: false });
	}
}

export class ThreadsRequestError extends ThreadsAPIError {
	constructor(opts: ThreadsAPIErrorOptions) {
		super({ ...opts, retriable: false });
	}
}

export class ThreadsServerError extends ThreadsAPIError {
	constructor(opts: ThreadsAPIErrorOptions) {
		super({ ...opts, retriable: true });
	}
}

export class ThreadsParseError extends ThreadsAPIError {
	constructor(opts: ThreadsAPIErrorOptions) {
		super({ ...opts, retriable: false });
	}
}

export function redact(value: unknown): unknown {
	if (Array.isArray(value)) return value.map((v) => redact(v));
	if (value !== null && typeof value === "object") {
		const out: Record<string, unknown> = {};
		for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
			out[key] = SECRET_KEY.test(key) ? "[REDACTED]" : redact(v);
		}
		return out;
	}
	return value;
}

interface ParsedErrorBody {
	message: string;
	code?: string | number;
	requestId?: string;
	data: unknown;
}

export function parseErrorBody(body: unknown): ParsedErrorBody {
	if (body !== null && typeof body === "object") {
		const anyBody = body as Record<string, unknown>;
		const error =
			anyBody.error !== null && typeof anyBody.error === "object"
				? (anyBody.error as Record<string, unknown>)
				: null;
		const message = String(
			error?.message ??
				anyBody.error_message ??
				anyBody.message ??
				"request failed",
		);
		const code = (error?.code ??
			anyBody.code ??
			anyBody.error_type ??
			undefined) as string | number | undefined;
		const requestId =
			String(error?.fbtrace_id ?? anyBody.fbtrace_id ?? "") || undefined;
		return { message, code, requestId, data: redact(body) };
	}
	return { message: String(body ?? "request failed"), data: redact(body) };
}

export function classifyError(status: number, body: unknown): ThreadsAPIError {
	const parsed = parseErrorBody(body);
	const opts: ThreadsAPIErrorOptions = {
		message: parsed.message,
		status,
		providerCode: parsed.code,
		requestId: parsed.requestId,
		responseBody: parsed.data,
	};
	if (status === 401) return new ThreadsAuthenticationError(opts);
	if (status === 403) return new ThreadsPermissionError(opts);
	if (status === 429) return new ThreadsRateLimitError(opts);
	if (status >= 500) return new ThreadsServerError(opts);
	return new ThreadsRequestError(opts);
}

export function classifyFromResponse(spec: ResponseSpec): ThreadsAPIError {
	return classifyError(spec.status, spec.body);
}
