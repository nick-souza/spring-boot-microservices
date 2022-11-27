import { Table } from "antd";
import { useEffect, useState } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import style from "../../pages/room/style.module.css";
import { api } from "../../service/api";
import { schedulesColumns } from "../schedule/userScheduleList";

interface RoomSchedulesListProps {
	setVisible: (visible: boolean) => void;
	room: RoomInterface | undefined;
	visible: boolean;
}

export default function RoomSchedulesList({ visible, setVisible, room }: RoomSchedulesListProps) {
	const [schedules, setSchedules] = useState<ScheduleInterface[]>();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (room) findSchedulesByRoom(room?.id);
	}, []);

	const findSchedulesByRoom = async (roomId: number) => {
		setLoading(true);
		await api
			.get(`/schedule/room/${roomId}`)
			.then((res) => {
				if (res.data.success) setSchedules(res.data.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<h1 className={style.room_schedule_title}>{room?.name}</h1>
			<Table
				bordered
				columns={schedulesColumns}
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
