export type WebhookTopic = "moderate" | "interaction";

export interface ThreadsWebhookEvent {
	app_id: string;
	topic: WebhookTopic;
	target_id: string;
	time: number;
	subscription_id: string;
	has_uid_field: boolean;
	values: {
		value: Record<string, unknown>;
		field: string;
	};
}

export interface ReplyWebhookValue {
	id: string;
	username?: string;
	text?: string;
	media_type?: string;
	permalink?: string;
	replied_to?: { id: string };
	root_post?: { id: string; owner_id?: string; username?: string };
	shortcode?: string;
	timestamp?: string;
	is_verified?: boolean;
	profile_picture_url?: string;
}

export interface MentionWebhookValue {
	id: string;
	alt_text?: string;
	gif_url?: string;
	has_replies?: boolean;
	is_quote_post?: boolean;
	is_reply?: boolean;
	media_product_type?: string;
	media_type?: string;
	permalink?: string;
	shortcode?: string;
	text?: string;
	timestamp?: string;
	username?: string;
	is_verified?: boolean;
	profile_picture_url?: string;
}

export interface DeleteWebhookValue {
	id: string;
	owner?: { owner_id: string };
	deleted_at?: string;
	timestamp?: string;
	username?: string;
}

export interface PublishWebhookValue {
	id: string;
	media_type?: string;
	permalink?: string;
	timestamp?: string;
	username?: string;
}
