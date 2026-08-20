export function encodeValue(value: unknown): string | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value === "boolean") return value ? "true" : "false";
	if (
		typeof value === "number" ||
		typeof value === "string" ||
		typeof value === "bigint"
	) {
		return String(value);
	}
	if (Array.isArray(value)) {
		return value
			.map((v) => (v === null || v === undefined ? "" : String(v)))
			.join(",");
	}
	return JSON.stringify(value);
}

export function toSearchParams(params: object): URLSearchParams {
	const sp = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		const encoded = encodeValue(value);
		if (encoded !== undefined) sp.set(key, encoded);
	}
	return sp;
}

export function buildQueryString(params: object): string {
	return toSearchParams(params).toString();
}

export function buildFormBody(body: object): URLSearchParams {
	return toSearchParams(body);
}
