import { SettingOutlined } from "@ant-design/icons";
import { Form, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { api } from "../../service/api";
import DeleteItemModal from "../table/deleteItemModal";
import TableList from "../table/table";
import TableOptions from "../table/tableOptions";
import CreateSchedule from "./createSchedule";
import ScheduleForm, { dateTimeFormat } from "./scheduleForm";
import { ScheduleFormResponse } from "./scheduleList";
import dayjs from "dayjs";

interface CalendarListingProps {
	date: dayjs.Dayjs;
}

export default function CalendarListing({ date }: CalendarListingProps) {
	const { user: loggedUser } = useContext(AuthContext);
	const notify = useNotifications();
	const [form] = Form.useForm();

	const [schedules, setSchedules] = useState<ScheduleInterface[]>();
	const [activeSchedule, setActiveSchedule] = useState<ScheduleInterface>();

	const [visibleDelete, setDeleteVisible] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);

	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		const dateFormat = "YYYY-MM-DD";
		let formattedDate = date.format(dateFormat);

		await api
			.get(`/schedule/date/${formattedDate}`)
			.then((res) => {
				if (res.data.success) setSchedules(res.data.data);
				else notify.error(res.data.errorMessage);
			})
			.catch((err) => {
				notify.error(err.response.data.errorMessage || "Erro");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleDelete = async () => {
		setDeleteLoading(true);
		await api.delete(`/schedule/${activeSchedule?.id}`).finally(() => {
			notify.success("Agendamento excluído com sucesso!");
			setDeleteVisible(false);
			setDeleteLoading(false);
			fetchData();
		});
	};

	const saveEdit = async (schedule: ScheduleFormResponse) => {
		setEditLoading(true);
		await api
			.put(`/schedule/${schedule?.id}`, {
				scheduleId: schedule.id,
				roomId: schedule.roomId,
				name: schedule?.name,
				responsibleId: schedule.responsibleId,
				bookingStart: schedule.bookingStart.format(dateTimeFormat),
				bookingEnd: schedule.bookingEnd.format(dateTimeFormat),
			})
			.then((res) => {
				if (res.data.success) {
					notify.success("Agendamento editado com sucesso!");
					fetchData();
				} else notify.error(res.data.errorMessage);
			})
			.catch((err) => {
				notify.error(err.response.data.errorMessage || "Erro");
			})
			.finally(() => {
				setEditVisible(false);
				setEditLoading(false);
			});
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
				panelTitle={"Agendamentos para " + date.format("DD/MM/YYYY")}
				form={form}
				setEditLoading={setEditLoading}
				visibleEdit={visibleEdit}
				columns={columns}
				editLoading={editLoading}
				setEditVisible={setEditVisible}
				fetchData={fetchData}
				dataSource={schedules}
				loading={loading}
				addButton={<CreateSchedule date={date} fetchTable={fetchData} />}
			>
				<ScheduleForm saveForm={saveEdit} form={form} schedule={activeSchedule} loading={editLoading} setLoading={setEditLoading} />
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
