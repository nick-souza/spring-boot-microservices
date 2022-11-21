import { AuthProvider } from "../contexts/AuthContext";
import "./_app.css";

function MyApp({ Component, pageProps }: any) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
