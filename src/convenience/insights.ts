import { ThreadsAPIError } from "../errors/errors.js";

export function metricsFrom<T extends string>(
	metrics: Record<T, boolean>,
): string {
	const selected = (Object.entries(metrics) as [T, boolean][])
		.filter(([, enabled]) => enabled === true)
		.map(([name]) => name)
		.join(",");

	if (!selected) {
		throw new ThreadsAPIError({
			message: "at least one metric must be enabled",
			retriable: false,
		});
	}
	return selected;
}
