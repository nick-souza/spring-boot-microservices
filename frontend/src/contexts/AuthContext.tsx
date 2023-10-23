import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import { UserRole } from "../enums/UserRole";
import { useNotifications } from "../hooks/useNotifications";
import { LoginCredentials, SignUpCredentials, UserLoggedIn } from "../interfaces/loginInterfaces";
import { ResponseInterface } from "../interfaces/responseInterface";
import { UserInterface } from "../interfaces/userInterface";
import { TokenResponse, api, validateToken } from "../service/api";

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserLoggedIn | null;
	refreshUser: () => void;
	login: (data: LoginCredentials) => Promise<void>;
	signUp: (data: SignUpCredentials) => Promise<void>;
	logout: () => Promise<void>;
	isAdmin: () => boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface UserLoginResponse {
	id: number;
	name: string;
	lastName: string;
	email: string;
	token: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
	const notify = useNotifications();

	const [user, setUser] = useState<UserLoggedIn | null>(null);
	const isAuthenticated = !!user;

	useEffect(() => {
		refreshUser();
	}, []);

	const refreshUser = () => {
		const { "auth.token": token } = parseCookies();

		if (!token) {
			Router.push("/");
			return;
		}

		validateToken(token).then((res: TokenResponse) => {
			if (res.success) setUser(res.data);
			else Router.push("/");
		});

		validateToken(token).then((res: TokenResponse) => {
			if (res.success) setUser(res.data);
			else Router.push("/");
		});
	};

	const login = async ({ email, password }: LoginCredentials) => {
		try {
			const { data } = await api.post<ResponseInterface<UserLoginResponse>>("/auth/login", {
				email,
				password,
			});

			setCookie(undefined, "auth.token", data.token, {
				maxAge: 60 * 60 * 24, // 24 horas
			});

			const _user = {
				id: data.id,
				email: data.email,
				name: data.name,
				lastName: data.lastName,
			} as UserLoggedIn;

			setUser(_user);

			api.axios.defaults.headers["Authorization"] = `Bearer ${data.token}`;

			Router.push("/schedule");
		} catch (error: any) {
			notify.error(error?.response?.data?.errorMessage);
		}
	};

	const signUp = async (SignUpCredentials: SignUpCredentials) => {
		try {
			const { success } = await api.post<ResponseInterface<UserInterface>>("/auth/sign-up", SignUpCredentials);

			if (success) {
				notify.success("Account created successfully");
				Router.push("/");
			}
		} catch (error: any) {
			notify.error(error.response?.data?.errorMessage);
		}
	};

	const logout = async () => {
		notify.success("Successfully logged out!");
		destroyCookie(undefined, "auth.token");

		Router.push("/");
	};

	const isAdmin = () => user?.role == UserRole.Admin;

	return (
		<AuthContext.Provider value={{ user, refreshUser, isAuthenticated, login, signUp, logout, isAdmin }}>
			{children}
		</AuthContext.Provider>
	);
}
