import type { AccessTokenResponse } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export class RawAuthTokens {
	constructor(private readonly transport: Transport) {}

	exchangeToken(accessToken: string, clientSecret: string) {
		return this.transport.request<AccessTokenResponse>({
			method: "GET",
			path: "/access_token",
			versioned: false,
			tokenRequired: false,
			params: {
				grant_type: "th_exchange_token",
				client_secret: clientSecret,
				access_token: accessToken,
			},
		});
	}

	refreshLongLivedToken(accessToken: string) {
		return this.transport.request<AccessTokenResponse>({
			method: "GET",
			path: "/refresh_access_token",
			versioned: false,
			tokenRequired: false,
			params: { grant_type: "th_refresh_token", access_token: accessToken },
		});
	}

	exchangeCode(params: {
		client_id: string;
		client_secret: string;
		code: string;
		redirect_uri: string;
	}) {
		return this.transport.request<AccessTokenResponse & { user_id: string }>({
			method: "POST",
			path: "/oauth/access_token",
			versioned: false,
			tokenRequired: false,
			body: { grant_type: "authorization_code", ...params },
		});
	}

	getAppToken(clientId: string, clientSecret: string) {
		return this.transport.request<AccessTokenResponse>({
			method: "GET",
			path: "/oauth/access_token",
			versioned: false,
			tokenRequired: false,
			params: {
				grant_type: "client_credentials",
				client_id: clientId,
				client_secret: clientSecret,
			},
		});
	}
}
