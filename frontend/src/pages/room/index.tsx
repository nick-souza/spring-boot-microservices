import MainLayout from "../../components/layout/mainLayout";
import RoomList from "../../components/room/roomList";
import { AuthProvider } from "../../contexts/AuthContext";

export default function RoomDashboard() {
	return (
		<>
			<AuthProvider>
				<MainLayout>
					<RoomList />
				</MainLayout>
			</AuthProvider>
		</>
	);
}

export { default as getServerSideProps } from "../../hooks/serverSideProps";
