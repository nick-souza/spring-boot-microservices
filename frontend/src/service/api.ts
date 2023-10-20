import { getAPIClient } from "./axios";

export const api = getAPIClient();

export interface TokenResponse {
	success: boolean;
	data?: any;
}

export async function validateToken(token: string): Promise<TokenResponse> {
	return new Promise((resolve, reject) => {
		getAPIClient()
			.post<any>(`/auth/validateToken?token=${token}`)
			.then((response) => {
				resolve({
					success: true,
					data: response.data,
				} as TokenResponse);
			})
			.catch((err) => {
				resolve({
					success: false,
					data: null,
				} as TokenResponse);
			});
	});
}
