import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { UserLoggedIn } from "../../interfaces/loginInterfaces";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { api } from "../../service/api";
import style from "../../pages/schedule/style.module.css";

interface UserSchedulesProps {
	user: UserLoggedIn | null;
}

export default function UserSchedules({ user }: UserSchedulesProps) {
	const [schedules, setSchedules] = useState<ScheduleInterface[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user) fetchData(user?.id);
	}, []);

	const columns: ColumnsType<ScheduleInterface> = [
		{
			key: "schedule_room",
			title: "Sala",
			dataIndex: "room",
		},
		{
			key: "schedule_responsible",
			title: "Responsável",
			dataIndex: "responsible",
		},
		{
			key: "schedule_bookingStart",
			title: "Começa em",
			dataIndex: "bookingStart",
			align: "right",
		},
		{
			key: "schedule_bookingEnd",
			title: "Termina em",
			dataIndex: "bookingEnd",
			align: "right",
		},
	];

	const fetchData = async (id: number) => {
		setLoading(true);

		await api
			.get(`/schedule/user/${id}`)
			.then((res) => {
				if (res.data.success) setSchedules(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<h1 className={style.user_schedule_title}>Agendamentos de {user?.name}</h1>
			<Table
				bordered
				columns={columns}
				loading={loading}
				dataSource={schedules}
				size="middle"
				rowKey={function (record): any {
					return record.id;
				}}
			/>
		</>
	);
}
