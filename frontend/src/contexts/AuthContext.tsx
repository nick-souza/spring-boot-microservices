import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { LoginCredentials, SignUpCredentials, UserLoggedIn, UserLoginResponse } from "../interfaces/loginInterfaces";
import { api, TokenResponse, validateToken } from "../service/api";
import { UserInterface } from "../interfaces/userInterface";
import { UserRole } from "../enums/UserRole";

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
	// const [messageApi, contextHolder] = message.useMessage();
	const [user, setUser] = useState<UserLoggedIn | null>(null);
	const [loading, setLoading] = useState(false);
	const notify = useNotifications();

	const isAuthenticated = !!user;

	// Use effect para toda vez que uma pagina for recarregada, ele verifica se existe o token,
	// Caso exista, faz uma call para api para pegar os dados do user:
	useEffect(() => {
		// Usando parseCookies para pegar todos os cookies:
		const { "auth.token": token } = parseCookies();

		// Caso exista, call API para pegar os dados:
		if (token) {
			validateToken(token).then((res: TokenResponse) => {
				console.log("USER DATA: ", res.data);

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
				console.log(err);
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
