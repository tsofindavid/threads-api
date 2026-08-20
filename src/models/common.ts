export interface PagingCursors {
	before?: string;
	after?: string;
}

export interface Page<T> {
	data: T[];
	paging?: {
		cursors?: PagingCursors;
		next?: string;
		previous?: string;
	};
}

export interface PageParams {
	since?: number | string;
	until?: number | string;
	limit?: number;
	before?: string;
	after?: string;
}

export const REPLY_CONTROLS = [
	"everyone",
	"accounts_you_follow",
	"mentioned_only",
	"parent_post_author_only",
	"followers_only",
] as const;
export type ReplyControl = (typeof REPLY_CONTROLS)[number];

export const SEARCH_TYPES = ["TOP", "RECENT"] as const;
export type SearchType = (typeof SEARCH_TYPES)[number];

export const SEARCH_MODES = ["KEYWORD", "TAG"] as const;
export type SearchMode = (typeof SEARCH_MODES)[number];

export interface PublishResult {
	id: string;
}

export const CONTAINER_STATUSES = [
	"EXPIRED",
	"ERROR",
	"FINISHED",
	"IN_PROGRESS",
	"PUBLISHED",
] as const;
export type ContainerStatusValue = (typeof CONTAINER_STATUSES)[number];

export interface ContainerStatus {
	id: string;
	status?: ContainerStatusValue;
	error_message?: string;
}
