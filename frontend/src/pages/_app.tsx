import { ConfigProvider } from "antd";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/loader/spinner";
import { AuthProvider } from "../contexts/AuthContext";
import "./_app.css";
import "./global.css";

export default function App({ Component, pageProps }: any) {
	const [loading, setLoading] = useState<boolean>(false);

	// Used to prevent flash from unstyled content on antd version 5
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (typeof window !== "undefined") {
		window.onload = () => {
			document.getElementById("holderStyle")!.remove();
		};
	}

	Router.events.on("routeChangeStart", () => {
		document.body.style.overflow = "hidden";
		setLoading(true);
	});

	Router.events.on("routeChangeComplete", () => {
		document.body.style.overflow = "unset";
		setLoading(false);
	});

	return (
		<>
			{/* Used to prevent flash from unstyled content on antd version 5 */}
			<ConfigProvider>
				<style
					id="holderStyle"
					dangerouslySetInnerHTML={{
						__html: `
							*, *::before, *::after {
								transition: none!important;
							}
                    	`,
					}}
				/>
				<div style={{ visibility: !mounted ? "hidden" : "visible" }}>
					<Head>
						<title>Agendamentos</title>
					</Head>

					<AuthProvider>
						{loading && <Spinner />}
						<Component {...pageProps} />
					</AuthProvider>
				</div>
			</ConfigProvider>
		</>
	);
}
