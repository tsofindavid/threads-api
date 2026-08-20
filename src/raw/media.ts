import type {
	MediaSearchType,
	Page,
	PageParams,
	SearchMode,
	SearchType,
	ThreadsMedia,
} from "../models/index.js";
import type { Transport } from "../transport/types.js";

export interface KeywordSearchParams extends PageParams {
	q: string;
	search_type?: SearchType;
	search_mode?: SearchMode;
	media_type?: MediaSearchType;
	fields?: string;
	author_username?: string;
}

export class RawMedia {
	constructor(private readonly transport: Transport) {}

	get(mediaId: string, fields?: string) {
		return this.transport.request<ThreadsMedia>({
			method: "GET",
			path: `/${mediaId}`,
			params: { fields },
		});
	}

	search(params: KeywordSearchParams) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: "/keyword_search",
			params,
		});
	}
}
