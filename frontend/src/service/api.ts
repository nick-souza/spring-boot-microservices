import { getAPIClient } from "./axios";

export const api = getAPIClient();

export interface TokenResponse {
	success: boolean;
	data?: any;
}

export async function validateToken(token: string): Promise<TokenResponse> {
	return new Promise(function (resolve, reject) {
		getAPIClient()
			.post(`/auth/validateToken?token=${token}`)
			.then((response) => {
				resolve({
					success: true,
					data: response.data,
				} as TokenResponse);
			})
			.catch((err) => {
				console.error(err);

				resolve({
					success: false,
					data: null,
				} as TokenResponse);
			});
	});
}
