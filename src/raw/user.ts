import type {
	Page,
	PageParams,
	PublishingLimitResponse,
	ThreadsMedia,
	ThreadsUser,
} from "../models/index.js";
import type { Transport } from "../transport/types.js";

export interface UserPostsParams extends PageParams {
	fields?: string;
}

export class RawUser {
	constructor(private readonly transport: Transport) {}

	getThreads(userId: string, opts: UserPostsParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${userId}/threads`,
			params: opts,
		});
	}

	getProfile(userId: string, fields?: string) {
		return this.transport.request<ThreadsUser>({
			method: "GET",
			path: `/${userId}`,
			params: { fields },
		});
	}

	lookupProfile(username: string) {
		return this.transport.request<ThreadsUser>({
			method: "GET",
			path: "/profile_lookup",
			params: { username },
		});
	}

	getProfilePosts(username: string, opts: UserPostsParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: "/profile_posts",
			params: { username, ...opts },
		});
	}

	getPublishingLimit(userId: string, fields?: string) {
		return this.transport.request<PublishingLimitResponse>({
			method: "GET",
			path: `/${userId}/threads_publishing_limit`,
			params: { fields },
		});
	}

	getReplies(userId: string, opts: UserPostsParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${userId}/replies`,
			params: opts,
		});
	}

	getMentions(userId: string, opts: UserPostsParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${userId}/mentions`,
			params: opts,
		});
	}

	getGhostPosts(userId: string, opts: UserPostsParams = {}) {
		return this.transport.request<Page<ThreadsMedia>>({
			method: "GET",
			path: `/${userId}/ghost_posts`,
			params: opts,
		});
	}
}
