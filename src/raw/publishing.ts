import type {
	GifAttachment,
	PollAttachment,
	TextAttachment,
	TextEntity,
} from "../models/attachments.js";
import type {
	ContainerStatus,
	MediaCreateType,
	PublishResult,
	ReplyControl,
} from "../models/index.js";
import type { Transport } from "../transport/types.js";

export interface CreateContainerParams {
	media_type: MediaCreateType;
	text?: string;
	image_url?: string;
	video_url?: string;
	is_carousel_item?: boolean;
	children?: string[];
	reply_to_id?: string;
	reply_control?: ReplyControl;
	allowlisted_country_codes?: string[];
	alt_text?: string;
	link_attachment?: string;
	quote_post_id?: string;
	poll_attachment?: PollAttachment;
	auto_publish_text?: boolean;
	topic_tag?: string;
	is_spoiler_media?: boolean;
	text_entities?: TextEntity[];
	text_attachment?: TextAttachment;
	gif_attachment?: GifAttachment;
	is_ghost_post?: boolean;
	enable_reply_approvals?: boolean;
	crossreshare_to_ig?: boolean;
	crossreshare_to_ig_dark_mode?: boolean;
	location_id?: string;
}

export class RawPublishing {
	constructor(private readonly transport: Transport) {}

	createContainer(userId: string, params: CreateContainerParams) {
		return this.transport.request<PublishResult>({
			method: "POST",
			path: `/${userId}/threads`,
			body: params,
		});
	}

	publishContainer(userId: string, creationId: string) {
		return this.transport.request<PublishResult>({
			method: "POST",
			path: `/${userId}/threads_publish`,
			body: { creation_id: creationId },
		});
	}

	getContainerStatus(containerId: string, fields?: string) {
		return this.transport.request<ContainerStatus>({
			method: "GET",
			path: `/${containerId}`,
			params: { fields },
		});
	}

	repost(mediaId: string) {
		return this.transport.request<PublishResult>({
			method: "POST",
			path: `/${mediaId}/repost`,
		});
	}

	delete(mediaId: string) {
		return this.transport.request<{ success: boolean }>({
			method: "DELETE",
			path: `/${mediaId}`,
		});
	}
}
