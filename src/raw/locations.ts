import type { ThreadsLocation } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export class RawLocations {
	constructor(private readonly transport: Transport) {}

	get(locationId: string, fields?: string) {
		return this.transport.request<ThreadsLocation>({
			method: "GET",
			path: `/${locationId}`,
			params: { fields },
		});
	}
}
