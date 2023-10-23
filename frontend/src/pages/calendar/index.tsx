import BigCalendar from "../../components/calendar";
import MainLayout from "../../components/layout/mainLayout";
import { AuthProvider } from "../../contexts/AuthContext";

export default function Calendar() {
	return (
		<AuthProvider>
			<MainLayout>
				{/* <div className={style.calendar_wrapper}> */}
				<BigCalendar />
				{/* </div> */}
			</MainLayout>
		</AuthProvider>
	);
}

export { default as getServerSideProps } from "../../hooks/serverSideProps";
