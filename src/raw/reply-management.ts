import type { Page, PageParams, ThreadsMedia } from "../models/index.js";
import type { Transport } from "../transport/types.js";

export interface ReplyListParams extends PageParams {
	fields?: string;
	reverse?: boolean;
}

export class RawReplyManagement {
	constructor(private readonly transport: Transport) {}

	listReplies(mediaId: string, opts: ReplyListParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${mediaId}/replies`,
			params: opts,
		});
	}

	getConversation(mediaId: string, opts: ReplyListParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${mediaId}/conversation`,
			params: opts,
		});
	}

	manageReply(replyId: string, hide: boolean) {
		return this.transport.request<{ success: boolean }>({
			method: "POST",
			path: `/${replyId}/manage_reply`,
			body: { hide },
		});
	}

	listPendingReplies(mediaId: string, opts: ReplyListParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${mediaId}/pending_replies`,
			params: opts,
		});
	}

	managePendingReply(replyId: string, approve: boolean) {
		return this.transport.request<{ success: boolean }>({
			method: "POST",
			path: `/${replyId}/manage_pending_reply`,
			body: { approve },
		});
	}
}
