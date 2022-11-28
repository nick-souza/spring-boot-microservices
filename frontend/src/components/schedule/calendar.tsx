import { Badge, BadgeProps, Calendar, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localeData from "dayjs/plugin/localeData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import style from "../../pages/schedule/style.module.css";
import { api } from "../../service/api";
import RightDrawer from "../table/rightDrawer";
import CalendarListing from "./calendarListing";
// import locale from "antd/lib/date-picker/locale/pt_BR";

interface CalendarEvent {
	id: number;
	label: string;
	type: string;
}

export default function Calendar1() {
	const [schedules, setSchedules] = useState<ScheduleInterface[]>();
	const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
	const [listVisible, setListVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user: loggedUser } = useContext(AuthContext);

	dayjs.extend(localeData);
	dayjs.locale("pt-br");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		await api
			.get(`/schedule/`)
			.then((res) => {
				if (res.data.success) setSchedules(res.data.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const filterByDate = (date: string) => {
		const filtered = schedules
			?.filter((schedule) => schedule.bookingStart.startsWith(date))
			.map((schedule) => {
				return {
					id: schedule?.id,
					label: schedule?.name,
					type: loggedUser?.id == schedule?.responsibleId ? "success" : "warning",
				} as CalendarEvent;
			});

		return filtered;
	};

	const dateCellRender = (value: dayjs.Dayjs) => {
		const dateFormat = "DD/MM/YYYY";
		let formattedDate = value.format(dateFormat);

		let listData = filterByDate(formattedDate);

		return (
			<>
				<ul className={style.calendar_event}>
					{listData?.map((item: any) => (
						<li key={item?.id}>
							<Badge status={item?.type as BadgeProps["status"]} text={item?.label} />
						</li>
					))}
				</ul>
			</>
		);
	};

	const handleSelect = (date: dayjs.Dayjs) => {
		// const dateFormat = "DD/MM/YYYY 08";
		// const dateFormat = "YYYY-MM-DD";
		// let formattedDate = date.format(dateFormat);

		setListVisible(true);
		setSelectedDate(date);
	};

	const header = ({ value, type, onChange }: any) => {
		const start = 0;
		const end = 12;
		const monthOptions = [];

		let current = value.clone();
		const localeData = value.localeData();

		const months = [];
		for (let i = 0; i < 12; i++) {
			current = current.month(i);
			let month = localeData.months(current).toString();
			const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
			months.push(capitalizedMonth);
		}

		for (let i = start; i < end; i++) {
			monthOptions.push(
				<Select.Option key={i} value={i} className="month-item">
					{months[i]}
				</Select.Option>
			);
		}

		const year = value.year();
		const month = value.month();
		const options = [];
		for (let i = year - 10; i < year + 10; i += 1) {
			options.push(
				<Select.Option key={i} value={i} className="year-item">
					{i}
				</Select.Option>
			);
		}
		return (
			<div style={{ padding: 8 }} className={style.calendar_header}>
				<h1 onDoubleClick={fetchData}>Agendamentos</h1>
				<Select
					className={style.calendar_select}
					size="small"
					dropdownMatchSelectWidth={false}
					value={month}
					onChange={(newMonth) => {
						const now = value.clone().month(newMonth);
						onChange(now);
					}}
				>
					{monthOptions}
				</Select>
			</div>
		);
	};

	const disabledDate = (current: dayjs.Dayjs) => {
		return current.add(1, "day") <= dayjs().endOf("day");
	};

	return (
		<>
			{loading ? (
				<div className={style.calendar_div}>
					<Calendar headerRender={header} />
				</div>
			) : (
				<div className={style.calendar_div}>
					<Calendar
						className={style.calendar}
						// locale={locale} // FIXME: Fix the locale
						headerRender={header}
						dateCellRender={dateCellRender}
						onSelect={handleSelect}
						disabledDate={disabledDate}
					/>
				</div>
			)}

			<RightDrawer
				title={"Agendamentos"}
				visible={listVisible}
				setVisible={setListVisible}
				loading={loading}
				setLoading={setLoading}
				handleOk={() => {
					setListVisible(false);
					fetchData();
				}}
				drawerWidth={920}
				okBtnName={"Ok"}
				onDrawerClose={() => fetchData()}
			>
				<CalendarListing date={selectedDate} />
			</RightDrawer>
		</>
	);
}
