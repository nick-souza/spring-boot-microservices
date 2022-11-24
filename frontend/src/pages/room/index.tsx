import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import LayoutComp from "../../components/layout/layoutComp";
import RoomList from "../../components/room/roomList";
import { AuthProvider } from "../../contexts/AuthContext";

export default function RoomDashboard() {
	return (
		<>
			<AuthProvider>
				<LayoutComp>
					<RoomList />
				</LayoutComp>
			</AuthProvider>
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
