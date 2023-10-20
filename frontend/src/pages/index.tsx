import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Home() {
	return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { ["auth.token"]: token } = parseCookies(ctx);

	let destination = "/login";
	if (token) destination = "/schedule";

	return {
		redirect: {
			destination: destination,
			permanent: false,
		},
	};
};
