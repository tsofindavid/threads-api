import type {
	PollAttachment,
	TextAttachment,
	TextEntity,
} from "./attachments.js";

export const MEDIA_CREATE_TYPES = [
	"TEXT",
	"IMAGE",
	"VIDEO",
	"CAROUSEL",
] as const;
export type MediaCreateType = (typeof MEDIA_CREATE_TYPES)[number];

export const MEDIA_SEARCH_TYPES = ["TEXT", "IMAGE", "VIDEO"] as const;
export type MediaSearchType = (typeof MEDIA_SEARCH_TYPES)[number];

export type MediaType = string;

export interface ThreadsMediaChildren {
	data: ThreadsMedia[];
}

export interface ThreadsMedia {
	id: string;
	media_product_type?: string;
	media_type?: MediaType;
	media_url?: string;
	permalink?: string;
	owner?: { id: string };
	username?: string;
	text?: string;
	timestamp?: string;
	shortcode?: string;
	thumbnail_url?: string;
	children?: ThreadsMediaChildren;
	is_quote_post?: boolean;
	alt_text?: string;
	link_attachment_url?: string;
	has_replies?: boolean;
	is_reply?: boolean;
	is_reply_owned_by_me?: boolean;
	root_post?: string;
	replied_to?: string;
	hide_status?: string;
	reply_audience?: string;
	quoted_post?: string;
	reposted_post?: string;
	gif_url?: string;
	poll_attachment?: PollAttachment;
	topic_tag?: string;
	is_spoiler_media?: boolean;
	text_entities?: TextEntity[];
	text_attachment?: TextAttachment;
	location_id?: string;
	is_verified?: boolean;
	profile_picture_url?: string;
	reply_approval_status?: string;
}
