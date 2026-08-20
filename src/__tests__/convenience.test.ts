import { expect, test } from "bun:test";
import { metricsFrom } from "../convenience/insights.js";
import { collect, paginate } from "../convenience/pagination.js";
import type { Page, PageParams } from "../models/common.js";

test("paginate follows the after cursor", async () => {
	const pages: Page<number>[] = [
		{ data: [1, 2], paging: { cursors: { after: "c1" } } },
		{ data: [3], paging: { cursors: { after: "c2" } } },
		{ data: [] },
	];
	let i = 0;
	const it = paginate<number>((params: PageParams) => {
		expect(params.after ?? undefined).toBe(i === 0 ? undefined : `c${i}`);
		return Promise.resolve(pages[i++] as Page<number>);
	});

	const result = await collect(it);
	expect(result).toEqual([1, 2, 3]);
});

test("paginate stops when there is no cursor", async () => {
	let calls = 0;
	const it = paginate<number>(() => {
		calls++;
		return Promise.resolve({ data: [1] });
	});
	const result = await collect(it);
	expect(result).toEqual([1]);
	expect(calls).toBe(1);
});

test("metricsFrom joins enabled metrics", () => {
	expect(metricsFrom({ views: true, likes: true, replies: false })).toBe(
		"views,likes",
	);
});

test("metricsFrom throws when nothing selected", () => {
	expect(() => metricsFrom({ views: false, likes: false })).toThrow();
});
