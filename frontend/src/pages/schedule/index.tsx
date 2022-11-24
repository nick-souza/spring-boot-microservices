import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import LayoutComp from "../../components/layout/layoutComp";

export default function ScheduleDashboard() {
	// const { user } = useContext(AuthContext);
	// console.log(user);
	return (
		<>
			<LayoutComp>
				<h1>Hello222</h1>
			</LayoutComp>
		</>
	);
}

// To avoid flashing on unauthorized pages:
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { ["auth.token"]: token } = parseCookies(ctx);

	if (!token)
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};

	return {
		props: {},
	};
};

// FIXME: TODO:
// export const getServerSideProps: GetServerSideProps = async () => {
//     return {
//         props: {},
//         redirect: {
//             permanent: true,
//             destination: "/sales/pipeline"
//         }
//     };
// };
