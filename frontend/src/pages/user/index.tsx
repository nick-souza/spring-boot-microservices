import LayoutComp from "../../components/layout/layoutComp";
import { AuthProvider } from "../../contexts/AuthContext";

export default function UserDashboard() {
	return (
		<>
			<AuthProvider>
				<LayoutComp>
					<h1>User</h1>
				</LayoutComp>
			</AuthProvider>
		</>
	);
}
