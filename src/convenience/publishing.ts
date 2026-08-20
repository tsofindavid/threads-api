import { ThreadsAPIError } from "../errors/errors.js";
import type { ContainerStatus } from "../models/index.js";
import type {
	CreateContainerParams,
	RawPublishing,
} from "../raw/publishing.js";

export interface WaitForContainerOptions {
	timeoutMs?: number;
	intervalMs?: number;
}

export function createPublishingConvenience(raw: RawPublishing) {
	return {
		async createAndPublish(userId: string, params: CreateContainerParams) {
			const { id } = await raw.createContainer(userId, params);
			return raw.publishContainer(userId, id);
		},

		async waitForContainer(
			containerId: string,
			opts: WaitForContainerOptions = {},
		): Promise<ContainerStatus> {
			const timeoutMs = opts.timeoutMs ?? 5 * 60_000;
			const intervalMs = opts.intervalMs ?? 60_000;
			const start = Date.now();

			while (Date.now() - start < timeoutMs) {
				const status = await raw.getContainerStatus(
					containerId,
					"id,status,error_message",
				);
				if (status.status && status.status !== "IN_PROGRESS") return status;
				await new Promise((resolve) => setTimeout(resolve, intervalMs));
			}

			throw new ThreadsAPIError({
				message: "timed out waiting for container status",
				retriable: false,
			});
		},
	};
}
