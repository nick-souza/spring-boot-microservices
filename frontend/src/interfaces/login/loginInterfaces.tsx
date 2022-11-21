export interface LoginCredentials {
	email: string;
	password: string;
}

export interface UserLoginResponse {
	id: number;
	name: string;
	email: string;
	// avatar_url: string;
}
