import type { DebugTokenResponse } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export class RawDebug {
	constructor(private readonly transport: Transport) {}

	token(inputToken: string) {
		return this.transport.request<DebugTokenResponse>({
			method: "GET",
			path: "/debug_token",
			params: { input_token: inputToken },
		});
	}
}
