import MainLayout from "../../components/layout/mainLayout";
import UserList from "../../components/user/userList";
import { AuthProvider } from "../../contexts/AuthContext";

export default function UserDashboard() {
	return (
		<>
			<AuthProvider>
				<MainLayout>
					<UserList />
				</MainLayout>
			</AuthProvider>
		</>
	);
}

export { default as getServerSideProps } from "../../hooks/serverSideProps";
