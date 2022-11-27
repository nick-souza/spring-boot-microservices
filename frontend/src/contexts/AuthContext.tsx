import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserRole } from "../enums/UserRole";
import { useNotifications } from "../hooks/useNotifications";
import { LoginCredentials, SignUpCredentials, UserLoggedIn } from "../interfaces/loginInterfaces";
import { api, TokenResponse, validateToken } from "../service/api";

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserLoggedIn | null;
	signIn: (data: LoginCredentials) => Promise<void>;
	signUp: (data: SignUpCredentials) => Promise<void>;
	logout: () => Promise<void>;
	isAdmin: () => boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserLoggedIn | null>(null);
	const notify = useNotifications();

	const isAuthenticated = !!user;

	useEffect(() => {
		// Usando parseCookies para pegar todos os cookies:
		const { "auth.token": token } = parseCookies();

		// Caso exista, call API para pegar os dados:
		if (token) {
			validateToken(token).then((res: TokenResponse) => {
				if (res.success) setUser(res.data);
				if (!res.success) Router.push("/");
			});
		} else {
			Router.push("/");
		}
	}, []);

	async function signIn({ email, password }: LoginCredentials) {
		await api
			.post("/auth/login", {
				email,
				password,
			})
			.then((res) => {
				notify.success("Successfully logged in!");

				const { id, email, name, lastName, creationDate, lastUpdate, roleDesc, statusDesc, token } = res.data.data as UserLoggedIn;

				const user = {
					id,
					email,
					name,
					statusDesc,
					roleDesc,
					lastName,
					creationDate,
					lastUpdate,
				} as UserLoggedIn;

				setCookie(undefined, "auth.token", token, {
					maxAge: 60 * 60 * 1, // 1 hora
				});

				api.defaults.headers["Authorization"] = `Bearer ${token}`;

				setUser(user);

				Router.push("/schedule");
			})
			.catch((err) => {
				notify.error(err.response?.data?.errorMessage);
			});
	}

	async function signUp(SignUpCredentials: SignUpCredentials) {
		await api
			.post("/auth/sign-in", SignUpCredentials)
			.then((res) => {
				if (res.data?.success) {
					notify.success("Account created successfully, you can now log in");
					Router.push("/");
				}
			})
			.catch((err) => {
				notify.error(err.response?.data?.errorMessage);
			});
	}

	async function logout() {
		notify.success("Successfully logged out!");
		destroyCookie(undefined, "auth.token");
		Router.push("/");
	}

	function isAdmin() {
		return user?.role == UserRole.Admin;
	}

	return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logout, isAdmin }}>{children}</AuthContext.Provider>;
}
