export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignUpCredentials {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserLoginResponse {
	id: number;
	// name: string;
	email: string;
	token: string;
	// avatar_url: string;
}

export interface UserLoggedIn {
	id: number;
	// name: string;
	email: string;
	// avatar_url: string;
}
