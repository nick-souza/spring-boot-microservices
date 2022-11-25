import { SettingOutlined } from "@ant-design/icons";
import { Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { api } from "../../service/api";
import TableList from "../table/table";
import TableOptions from "../table/tableOptions";
import ScheduleEditForm from "./scheduleEditForm";

export default function ScheduleList() {
	const [schedules, setSchedules] = useState<ScheduleInterface[]>();
	const [loading, setLoading] = useState(false);
	const [activeSchedule, setActiveSchedule] = useState<ScheduleInterface>();
	const [visibleDelete, setDeleteVisible] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const notify = useNotifications();

	const [form] = Form.useForm();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		await api
			.get("/schedule/")
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

	const handleDelete = async () => {
		setDeleteLoading(true);
		await api
			.delete(`/schedule/${activeSchedule?.id}`)
			.then((res) => {
				notify.success("Agendamento excluído com sucesso!");
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setDeleteVisible(false);
				setDeleteLoading(false);
				fetchData();
			});
	};

	const saveEdit = async (schedule: ScheduleInterface) => {
		setEditLoading(true);
		console.log(schedule);
		// await api
		// 	.put(`/schedule/update/${schedule?.id}`, {
		// 		id: schedule.id,
		// 		name: schedule.name,
		// 		lastName: schedule.lastName,
		// 		email: schedule.email != activeSchedule?.email ? schedule.email : null,
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 		notify.success("Usuário editado com sucesso!");
		// 	})
		// 	.catch((err) => {
		// 		notify.error(err.response.data.errorMessage || "Erro!");
		// 	})
		// 	.finally(() => {
		// 		setEditVisible(false);
		// 		setEditLoading(false);
		// 		fetchData();
		// 	});
	};

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
		{
			key: "schedule_opt",
			title: <SettingOutlined />,
			align: "center",
			width: 60,
			dataIndex: "operation",
			render: (_, schedule: ScheduleInterface) => (
				<TableOptions
					handleDelete={() => {
						setDeleteVisible(true);
						setActiveSchedule(schedule);
					}}
					handleEdit={() => {
						setActiveSchedule(schedule);
						setEditVisible(true);
					}}
				/>
			),
		},
	];

	return (
		<>
			<TableList
				panelTitle="Usuários"
				editChildren={<ScheduleEditForm saveForm={saveEdit} form={form} schedule={activeSchedule} loading={editLoading} setLoading={setEditLoading} />}
				form={form}
				handleDeleteOk={() => handleDelete()}
				setEditLoading={setEditLoading}
				visibleEdit={visibleEdit}
				columns={columns}
				editLoading={editLoading}
				setEditVisible={setEditVisible}
				deleteLoading={deleteLoading}
				setDeleteLoading={setDeleteLoading}
				fetchData={fetchData}
				dataSource={schedules}
				loading={loading}
				deleteModalName={"Agendamento"}
				visibleDelete={visibleDelete}
				setDeleteVisible={setDeleteVisible}
			/>
		</>
	);
}
