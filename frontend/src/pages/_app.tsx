import Router from "next/router";
import { useState } from "react";
import Spinner from "../components/loader/spinner";
import { AuthProvider } from "../contexts/AuthContext";
import "./global.css";
import "./_app.css";

function MyApp({ Component, pageProps }: any) {
	const [loading, setLoading] = useState<boolean>(false);

	Router.events.on("routeChangeStart", () => {
		setLoading(true);
	});
	Router.events.on("routeChangeComplete", () => {
		setLoading(false);
	});

	return (
		<AuthProvider>
			{loading && <Spinner />}
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
