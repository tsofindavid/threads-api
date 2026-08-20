import type { Page, PageParams } from "../models/common.js";

export async function* paginate<T>(
	requestPage: (pageParams: PageParams) => Promise<Page<T>>,
	initial: PageParams = {},
): AsyncGenerator<T, void, void> {
	const params: PageParams = { ...initial };
	while (true) {
		const page = await requestPage(params);
		for (const item of page.data) yield item;
		const cursor = page.paging?.cursors?.after;
		if (!cursor) return;
		params.after = cursor;
		delete params.before;
	}
}

export async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
	const out: T[] = [];
	for await (const item of iterable) out.push(item);
	return out;
}
