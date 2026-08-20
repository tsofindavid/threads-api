export const MEDIA_METRICS = [
	"views",
	"likes",
	"replies",
	"reposts",
	"quotes",
	"shares",
] as const;
export type MediaMetric = (typeof MEDIA_METRICS)[number];

export const USER_METRICS = [
	"views",
	"likes",
	"replies",
	"reposts",
	"quotes",
	"clicks",
	"followers_count",
	"follower_demographics",
] as const;
export type UserMetric = (typeof USER_METRICS)[number];

export interface InsightValue {
	value: number;
}

export interface InsightEntry {
	name: string;
	period: string;
	values: InsightValue[];
}

export interface MediaInsights {
	data: InsightEntry[];
}
