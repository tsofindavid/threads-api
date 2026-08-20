import type { OEmbedData } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export class RawOEmbed {
	constructor(private readonly transport: Transport) {}

	get(url: string, maxwidth?: number) {
		return this.transport.request<OEmbedData>({
			method: "GET",
			path: "/oembed",
			params: { url, maxwidth },
			tokenRequired: false,
		});
	}
}
