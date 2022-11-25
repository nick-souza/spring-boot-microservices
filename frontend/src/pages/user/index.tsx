import LayoutComp from "../../components/layout/layoutComp";
import UserList from "../../components/user/userList";
import { AuthProvider } from "../../contexts/AuthContext";

export default function UserDashboard() {
	return (
		<>
			<AuthProvider>
				<LayoutComp>
					<UserList />
				</LayoutComp>
			</AuthProvider>
		</>
	);
}
