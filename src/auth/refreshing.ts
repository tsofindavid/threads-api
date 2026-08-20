import type { TokenProvider } from "./token-provider.js";

export interface RefreshingTokenProviderOptions {
	token: string;
	refresh: (currentToken: string) => Promise<string> | string;
}

export class RefreshingTokenProvider implements TokenProvider {
	private token: string;
	private readonly refreshFn: (
		currentToken: string,
	) => Promise<string> | string;

	constructor(opts: RefreshingTokenProviderOptions) {
		this.token = opts.token;
		this.refreshFn = opts.refresh;
	}

	getToken(): string {
		return this.token;
	}

	async refresh(): Promise<void> {
		this.token = await this.refreshFn(this.token);
	}
}
