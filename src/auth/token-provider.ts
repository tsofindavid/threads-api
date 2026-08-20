export interface TokenProvider {
	getToken(): Promise<string> | string;
	refresh?(): Promise<void> | void;
}
