import type { RetryOptions } from "../config.js";
import { ThreadsAPIError } from "../errors/errors.js";

export function delayFor(
	attempt: number,
	retry: Required<RetryOptions>,
): number {
	return Math.min(retry.initialDelayMs * 2 ** (attempt - 1), retry.maxDelayMs);
}

export function isRetriable(err: unknown): err is ThreadsAPIError {
	return err instanceof ThreadsAPIError && err.retriable;
}
