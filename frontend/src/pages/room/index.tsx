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

export { default as getServerSideProps } from "../../hooks/serverSideProps";
