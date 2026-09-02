export const THREADS_SCOPES = [
	"threads_basic",
	"threads_content_publish",
	"threads_manage_replies",
	"threads_read_replies",
	"threads_manage_insights",
] as const;
export type ThreadsScope = (typeof THREADS_SCOPES)[number];
