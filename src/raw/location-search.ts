import type { Page, ThreadsLocation } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export interface LocationSearchParams {
	query?: string;
	latitude?: number;
	longitude?: number;
	fields?: string;
}

export class RawLocationSearch {
	constructor(private readonly transport: Transport) {}

	search(params: LocationSearchParams) {
		return this.transport.request<Page<ThreadsLocation>>({
			method: "GET",
			path: "/location_search",
			params,
		});
	}
}
