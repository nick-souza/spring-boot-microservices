import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import LayoutComp from "../../components/layout/layoutComp";
import Calendar1 from "../../components/schedule/calendar";
import ScheduleList from "../../components/schedule/scheduleList";
import { AuthProvider } from "../../contexts/AuthContext";
import style from "./style.module.css";

export default function ScheduleDashboard() {
	return (
		<>
			<AuthProvider>
				<LayoutComp>
					<ScheduleList />
					{/* <div className={style.calendar_wrapper}>
						<Calendar1 />
					</div> */}
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

// FIXME: TODO:
// export const getServerSideProps: GetServerSideProps = async () => {
//     return {
//         props: {},
//         redirect: {
//             permanent: true,
//             destination: "/sales/pipeline"
//         }
//     };
// };
