import type { MediaInsights } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export class RawInsights {
	constructor(private readonly transport: Transport) {}

	getMediaInsights(mediaId: string, metric: string) {
		return this.transport.request<MediaInsights>({
			method: "GET",
			path: `/${mediaId}/insights`,
			params: { metric },
		});
	}

	getUserInsights(
		userId: string,
		metric: string,
		range?: { since?: number; until?: number },
	) {
		return this.transport.request<MediaInsights>({
			method: "GET",
			path: `/${userId}/threads_insights`,
			params: { metric, since: range?.since, until: range?.until },
		});
	}
}
