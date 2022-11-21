import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

// import { recoverUserInformation, signInRequest } from "../services/auth";
// import { api } from "../services/api";

interface User {
	id: number;
	name: string;
	email: string;
	// avatar_url: string;
}

interface SignInData {
	email: string;
	password: string;
}

interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null; // FIXME: Do not allow null here. Only until we cant get the dada from the API
	signIn: (data: SignInData) => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	const isAuthenticated = !!user;

	useEffect(() => {
		const { "nextauth.token": token } = parseCookies();

		if (token) {
			// TODO: Recover information from the JWT Claims??
			// recoverUserInformation().then((response) => {
			// 	setUser(response.user);
			// });
		}
	}, []);

	async function signIn({ email, password }: SignInData) {
		// TODO: Add the login logic here:

		// const { token, user } = await signInRequest({
		// 	email,
		// 	password,
		// });

		// TODO: Set the cookie with the token:
		// setCookie(undefined, "nextauth.token", token, {
		// 	maxAge: 60 * 60 * 1, // 1 hour
		// });

		// api.defaults.headers["Authorization"] = `Bearer ${token}`;

		setUser(user);

		// TODO: Redirect to the ALL APPOINTMENTS page:
		Router.push("/dashboard");
	}

	return <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>{children}</AuthContext.Provider>;
}
