export interface PollAttachment {
	option_a?: string;
	option_b?: string;
	option_c?: string;
	option_d?: string;
	option_a_votes_percentage?: number;
	option_b_votes_percentage?: number;
	option_c_votes_percentage?: number;
	option_d_votes_percentage?: number;
	total_votes?: number;
	expiration_timestamp?: string;
}

export interface TextEntity {
	entity_type: string;
	offset: number;
	length: number;
	text?: string;
}

export interface StylingInfoRange {
	offset: number;
	length: number;
	styling_info: string[];
}

export interface TextAttachment {
	plaintext: string;
	link_attachment_url?: string;
	text_with_styling_info?: StylingInfoRange[];
}

export interface GifAttachment {
	gif_id: string;
	provider: string;
}
