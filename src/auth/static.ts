import type { TokenProvider } from "./token-provider.js";

export class StaticTokenProvider implements TokenProvider {
	constructor(private readonly token: string) {}

	getToken(): string {
		return this.token;
	}
}
