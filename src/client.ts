import { StaticTokenProvider } from "./auth/static.js";
import type { TokenProvider } from "./auth/token-provider.js";
import type { ThreadsConfig } from "./config.js";
import {
	DEFAULT_API_VERSION,
	DEFAULT_BASE_URL,
	DEFAULT_TIMEOUT_MS,
	resolveRetry,
} from "./config.js";
import { metricsFrom } from "./convenience/insights.js";
import { createMediaConvenience } from "./convenience/media.js";
import { paginate } from "./convenience/pagination.js";
import { createPublishingConvenience } from "./convenience/publishing.js";
import { ThreadsAPIError } from "./errors/errors.js";
import { RawAuthTokens } from "./raw/auth-tokens.js";
import { RawDebug } from "./raw/debug.js";
import { RawInsights } from "./raw/insights.js";
import { RawLocationSearch } from "./raw/location-search.js";
import { RawLocations } from "./raw/locations.js";
import { RawMedia } from "./raw/media.js";
import { RawOEmbed } from "./raw/oembed.js";
import { RawPublishing } from "./raw/publishing.js";
import { RawReplyManagement } from "./raw/reply-management.js";
import { RawUser } from "./raw/user.js";
import { FetchTransport } from "./transport/fetch-transport.js";

export class ThreadsAPI {
	readonly raw: {
		publishing: RawPublishing;
		media: RawMedia;
		replyManagement: RawReplyManagement;
		user: RawUser;
		locations: RawLocations;
		locationSearch: RawLocationSearch;
		insights: RawInsights;
		oembed: RawOEmbed;
		debug: RawDebug;
		authTokens: RawAuthTokens;
	};

	readonly publishing: ReturnType<typeof createPublishingConvenience>;
	readonly media: ReturnType<typeof createMediaConvenience>;
	readonly insights: { metricsFrom: typeof metricsFrom };
	readonly paginate: typeof paginate;

	constructor(config: ThreadsConfig) {
		const auth = resolveAuth(config);

		const transport = new FetchTransport({
			baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
			apiVersion: config.apiVersion ?? DEFAULT_API_VERSION,
			auth,
			timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
			retry: resolveRetry(config.retry),
			hooks: config.hooks,
			fetchImpl: config.fetch,
		});

		this.raw = {
			publishing: new RawPublishing(transport),
			media: new RawMedia(transport),
			replyManagement: new RawReplyManagement(transport),
			user: new RawUser(transport),
			locations: new RawLocations(transport),
			locationSearch: new RawLocationSearch(transport),
			insights: new RawInsights(transport),
			oembed: new RawOEmbed(transport),
			debug: new RawDebug(transport),
			authTokens: new RawAuthTokens(transport),
		};

		this.publishing = createPublishingConvenience(this.raw.publishing);
		this.media = createMediaConvenience(this.raw.media);
		this.insights = { metricsFrom };
		this.paginate = paginate;
	}
}

export function createThreadsAPI(config: ThreadsConfig): ThreadsAPI {
	return new ThreadsAPI(config);
}

function resolveAuth(config: ThreadsConfig): TokenProvider {
	if (config.auth) return config.auth;
	if (config.accessToken) return new StaticTokenProvider(config.accessToken);
	throw new ThreadsAPIError({
		message: "ThreadsAPI: provide either `accessToken` or `auth`",
		retriable: false,
	});
}
