import BigCalendar from "../../components/calendar";
import LayoutComp from "../../components/layout/layoutComp";
import { AuthProvider } from "../../contexts/AuthContext";

export default function Calendar() {
	return (
		<AuthProvider>
			<LayoutComp>
				{/* <div className={style.calendar_wrapper}> */}
				<BigCalendar />
				{/* </div> */}
			</LayoutComp>
		</AuthProvider>
	);
}

export { default as getServerSideProps } from "../../hooks/serverSideProps";
