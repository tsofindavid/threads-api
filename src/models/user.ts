export interface RecentlySearchedKeyword {
	query: string;
	timestamp: number;
}

export interface ThreadsUser {
	id: string;
	username?: string;
	name?: string;
	threads_profile_picture_url?: string;
	threads_biography?: string;
	is_verified?: boolean;
	recently_searched_keywords?: RecentlySearchedKeyword[];
}

export interface QuotaConfig {
	quota_total?: number;
	quota_duration?: number;
}

export interface PublishingLimitData {
	quota_usage?: number;
	config?: QuotaConfig;
	reply_quota_usage?: number;
	reply_config?: QuotaConfig;
	delete_quota_usage?: number;
	delete_config?: QuotaConfig;
	location_search_quota_usage?: number;
	location_search_config?: QuotaConfig;
}

export interface PublishingLimitResponse {
	data: PublishingLimitData[];
}
