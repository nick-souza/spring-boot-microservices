import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(context?: any) {
	const { "auth.token": token } = parseCookies(context);

	const api = axios.create({
		baseURL: "http://localhost:8080",
	});

	if (token) {
		api.defaults.headers["Authorization"] = `Bearer ${token}`;
	}

	return api;
}
