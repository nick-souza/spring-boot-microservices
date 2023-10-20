import { SettingOutlined } from "@ant-design/icons";
import { Form, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { api } from "../../service/api";
import DeleteItemModal from "../table/deleteItemModal";
import TableList from "../table/table";
import TableOptions from "../table/tableOptions";
import CreateSchedule from "./createSchedule";
import ScheduleForm, { dateTimeFormat } from "./scheduleForm";
import { ResponseInterface, ResponseListInterface } from "../../interfaces/responseInterface";

export interface ScheduleFormResponse {
	id?: number;
	name: string;
	roomId: number;
	responsibleId: number;
	bookingStart: dayjs.Dayjs;
	bookingEnd: dayjs.Dayjs;
}

export default function ScheduleList() {
	const [form] = Form.useForm();
	const notify = useNotifications();

	const { user: loggedUser } = useContext(AuthContext);

	const [schedules, setSchedules] = useState<ScheduleInterface[]>();
	const [activeSchedule, setActiveSchedule] = useState<ScheduleInterface>();

	const [visibleDelete, setDeleteVisible] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);

	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);

	useEffect(() => {
		getSchedules();
	}, []);

	const getSchedules = async () => {
		setLoading(true);

		try {
			const { success, data, errorMessage } = await api.get<ResponseListInterface<ScheduleInterface>>(`/schedule/`);

			if (success) setSchedules(data);
			else notify.error(errorMessage);
		} catch (error: any) {
			notify.error(error.response?.data?.errorMessage);
		}

		setLoading(false);
	};

	const handleDelete = async () => {
		setDeleteLoading(true);
		await api.delete(`/schedule/${activeSchedule?.id}`).finally(() => {
			notify.success("Agendamento excluído com sucesso!");
			setDeleteVisible(false);
			setDeleteLoading(false);
			getSchedules();
		});
	};

	const handleEdit = async (schedule: ScheduleFormResponse) => {
		setEditLoading(true);

		const data = {
			scheduleId: schedule.id,
			roomId: schedule.roomId,
			name: schedule?.name,
			responsibleId: schedule.responsibleId,
			bookingStart: schedule.bookingStart.format(dateTimeFormat),
			bookingEnd: schedule.bookingEnd.format(dateTimeFormat),
		};

		try {
			const { success, errorMessage } = await api.put<ResponseInterface<ScheduleInterface>>(`/schedule/${schedule?.id}`, data);

			if (!success) {
				setLoading(false);
				notify.error(errorMessage);
				return;
			}
		} catch (error: any) {
			notify.error(error.response?.data?.errorMessage);
			return;
		}

		notify.success("Agendamento editado com sucesso!");
		setEditVisible(false);
		setEditLoading(false);
		getSchedules();
	};

	const columns: ColumnsType<ScheduleInterface> = [
		{
			key: "schedule_name",
			title: "Nome",
			dataIndex: "name",
		},
		{
			key: "schedule_room",
			title: "Sala",
			dataIndex: "room",
		},
		{
			key: "schedule_responsible",
			title: "Responsável",
			dataIndex: "responsible",
			render: (_, schedule: ScheduleInterface) => (
				<span>
					{schedule?.responsible}
					{schedule?.responsibleId == loggedUser?.id && (
						<Tag className="user-tag" color="geekblue">
							Você
						</Tag>
					)}
				</span>
			),
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
					applyPermissions={true}
					isSelf={schedule?.responsibleId == loggedUser?.id}
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
				panelTitle="Agendamentos"
				form={form}
				setEditLoading={setEditLoading}
				visibleEdit={visibleEdit}
				columns={columns}
				editLoading={editLoading}
				setEditVisible={setEditVisible}
				fetchData={getSchedules}
				dataSource={schedules}
				loading={loading}
				addButton={<CreateSchedule fetchTable={getSchedules} />}
			>
				<ScheduleForm
					saveForm={handleEdit}
					form={form}
					schedule={activeSchedule}
					loading={editLoading}
					setLoading={setEditLoading}
				/>
			</TableList>

			<DeleteItemModal
				name={"Agendamento"}
				handleOk={handleDelete}
				visible={visibleDelete}
				setVisible={setDeleteVisible}
				loading={deleteLoading}
				setLoading={setDeleteLoading}
			/>
		</>
	);
}
