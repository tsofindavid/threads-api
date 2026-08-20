export interface RequestSpec {
	method: "GET" | "POST" | "DELETE";
	path: string;
	params?: object;
	body?: object;
	tokenRequired?: boolean;
	versioned?: boolean;
}

export interface ResponseSpec {
	status: number;
	headers: Headers;
	body: unknown;
	rawBody: string;
}

export type FetchFn = (
	input: string | URL,
	init?: RequestInit,
) => Promise<Response>;

export interface Transport {
	request<T>(spec: RequestSpec): Promise<T>;
}
