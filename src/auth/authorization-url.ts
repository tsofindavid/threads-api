import { ThreadsAPIError } from "../errors/errors.js";
import type { ThreadsScope } from "../models/scopes.js";

export const DEFAULT_AUTHORIZATION_BASE_URL =
	"https://threads.net/oauth/authorize";

export interface AuthorizationUrlParams {
	clientId: string;
	redirectUri: string;
	scope: ThreadsScope | ThreadsScope[];
	state?: string;
	baseUrl?: string;
}

export function buildAuthorizationUrl(params: AuthorizationUrlParams): string {
	if (!params.clientId || !params.redirectUri) {
		throw new ThreadsAPIError({
			message:
				"buildAuthorizationUrl: `clientId` and `redirectUri` are required",
			retriable: false,
		});
	}

	const scope = Array.isArray(params.scope)
		? params.scope.join(",")
		: params.scope;

	const url = new URL(params.baseUrl ?? DEFAULT_AUTHORIZATION_BASE_URL);
	url.searchParams.set("client_id", params.clientId);
	url.searchParams.set("redirect_uri", params.redirectUri);
	url.searchParams.set("scope", scope);
	url.searchParams.set("response_type", "code");

	if (params.state) url.searchParams.set("state", params.state);

	return url.toString();
}
