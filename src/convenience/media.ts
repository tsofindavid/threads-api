import type { ThreadsMedia } from "../models/index.js";
import type { KeywordSearchParams, RawMedia } from "../raw/media.js";
import { paginate } from "./pagination.js";

export function createMediaConvenience(raw: RawMedia) {
	return {
		async *searchAll(
			params: KeywordSearchParams,
		): AsyncGenerator<ThreadsMedia, void, void> {
			yield* paginate<ThreadsMedia>((pageParams) =>
				raw.search({ ...params, ...pageParams }),
			);
		},
	};
}
