import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useNotifications } from "../hooks/useNotifications";

export function getAPIClient(context?: any) {
	const notify = useNotifications();
	const { "auth.token": token } = parseCookies(context);

	const api = axios.create({
		baseURL: "http://localhost:8080",
	});

	api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
	api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

	if (token) api.defaults.headers["Authorization"] = `Bearer ${token}`;

	const errorHandler = (error: any) => {
		if (!error) return;

		const status = error.response?.status;
		switch (status) {
			case 401:
				Router.push("/");
				break;

			case 403:
				Router.push("/schedule");
				notify.warning("Permission required");
				break;
		}

		return;
	};

	const _api = {
		axios: api,
		get: <T,>(url: string, config?: AxiosRequestConfig) =>
			new Promise<T>((resolve, reject) => {
				api
					.get(url, config)
					.then((response) => resolve(response.data))
					.catch((error) => {
						errorHandler(error);
						reject(error);
					});
			}),
		post: <T,>(url: string, data?: any, config?: AxiosRequestConfig) =>
			new Promise<T>((resolve, reject) => {
				api
					.post(url, data, config)
					.then((response) => resolve(response.data))
					.catch((error) => {
						errorHandler(error);
						reject(error);
					});
			}),
		put: <T,>(url: string, data?: any, config?: AxiosRequestConfig) =>
			new Promise<T>((resolve, reject) => {
				api
					.put(url, data, config)
					.then((response) => resolve(response.data))
					.catch((error) => {
						errorHandler(error);
						reject(error);
					});
			}),
		delete: <T,>(url: string, config?: AxiosRequestConfig) =>
			new Promise<T>((resolve, reject) => {
				api
					.delete(url, config)
					.then((response) => resolve(response.data))
					.catch((error) => {
						errorHandler(error);
						reject(error);
					});
			}),
		patch: <T,>(url: string, data?: any, config?: AxiosRequestConfig) =>
			new Promise<T>((resolve, reject) => {
				api
					.patch(url, data, config)
					.then((response) => resolve(response.data))
					.catch((error) => {
						errorHandler(error);
						reject(error);
					});
			}),
	};

	return _api;
}
