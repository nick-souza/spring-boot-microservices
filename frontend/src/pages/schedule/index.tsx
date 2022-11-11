import LayoutComp from "../../components/layout/layoutComp";
import Calendar1 from "../../components/schedule/calendar";
import { AuthProvider } from "../../contexts/AuthContext";
import style from "./style.module.css";

export default function ScheduleDashboard() {
	return (
		<AuthProvider>
			<LayoutComp>
				{/* <ScheduleList /> */}
				<div className={style.calendar_wrapper}>
					<Calendar1 />
				</div>
			</LayoutComp>
		</AuthProvider>
	);
}

export { default as getServerSideProps } from "../../hooks/serverSideProps";
