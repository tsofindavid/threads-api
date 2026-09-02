import { ThreadsAPIError } from "../errors/errors.js";

export interface AuthorizationSuccess {
	ok: true;
	code: string;
	state?: string;
}

export interface AuthorizationFailure {
	ok: false;
	error: string;
	errorReason?: string;
	errorDescription?: string;
}

export type AuthorizationRedirectResult =
	| AuthorizationSuccess
	| AuthorizationFailure;

export function parseAuthorizationRedirect(
	redirectUrl: string | URL,
): AuthorizationRedirectResult {
	const url = redirectUrl instanceof URL ? redirectUrl : new URL(redirectUrl);
	const params = url.searchParams;

	const error = params.get("error");
	if (error) {
		return {
			ok: false,
			error,
			errorReason: params.get("error_reason") ?? undefined,
			errorDescription: params.get("error_description") ?? undefined,
		};
	}

	const code = params.get("code");
	if (!code) {
		throw new ThreadsAPIError({
			message:
				"parseAuthorizationRedirect: redirect URL has neither `code` nor `error`",
			retriable: false,
		});
	}

	return { ok: true, code, state: params.get("state") ?? undefined };
}
