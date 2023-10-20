import { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";

export default async function getServerSideProps(ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
	const { ["auth.token"]: token } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
