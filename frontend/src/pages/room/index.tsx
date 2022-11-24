import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import LayoutComp from "../../components/layout/layoutComp";
// import Layout from "../../components/layout/layout";
import RoomList from "../../components/room/roomList";

export default function RoomDashboard() {
	return (
		<>
			<LayoutComp>
				<RoomList />
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
