export interface DebugTokenData {
	type?: string;
	application?: string;
	data_access_expires_at?: number;
	expires_at?: number;
	is_valid?: boolean;
	issued_at?: number;
	scopes?: string[];
	user_id?: string;
}

export interface DebugTokenResponse {
	data: DebugTokenData;
}
