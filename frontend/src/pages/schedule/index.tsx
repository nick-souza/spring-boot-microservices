import MainLayout from "../../components/layout/mainLayout";
import Calendar1 from "../../components/schedule/calendar";
import { AuthProvider } from "../../contexts/AuthContext";
import style from "./style.module.css";

export default function ScheduleDashboard() {
	return (
		<AuthProvider>
			<MainLayout>
				{/* <ScheduleList /> */}
				<div className={style.calendar_wrapper}>
					<Calendar1 />
				</div>
			</MainLayout>
		</AuthProvider>
	);
}

export { default as getServerSideProps } from "../../hooks/serverSideProps";
