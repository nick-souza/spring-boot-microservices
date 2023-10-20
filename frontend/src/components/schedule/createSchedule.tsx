import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { api } from "../../service/api";
import RightDrawer from "../table/rightDrawer";
import ScheduleForm, { dateTimeFormat } from "./scheduleForm";
import { ScheduleFormResponse } from "./scheduleList";
import dayjs from "dayjs";
import { ResponseInterface } from "../../interfaces/responseInterface";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";

export interface CreateEntityProps {
	fetchTable: () => void;
	date?: dayjs.Dayjs;
}

export default function CreateSchedule({ fetchTable, date }: CreateEntityProps) {
	const [form] = Form.useForm();
	const notify = useNotifications();

	const { user } = useContext(AuthContext);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user) form.setFieldValue("responsibleId", user.id);
	}, [user]);

	const saveAdd = async (schedule: ScheduleFormResponse) => {
		setLoading(true);

		const data = {
			roomId: schedule?.roomId,
			name: schedule?.name,
			responsibleId: schedule?.responsibleId,
			bookingStart: schedule.bookingStart.format(dateTimeFormat),
			bookingEnd: schedule.bookingEnd.format(dateTimeFormat),
		};

		try {
			const { success, errorMessage } = await api.post<ResponseInterface<ScheduleInterface>>("/schedule/add/", data);

			if (!success) {
				setLoading(false);
				notify.error(errorMessage);
				return;
			}
		} catch (error: any) {
			notify.error(error.response?.data?.errorMessage);
			return;
		}

		notify.success("Agendamento criado com sucesso!");
		setLoading(false);
		setVisible(false);
		fetchTable();
	};

	return (
		<>
			<Button onClick={() => setVisible(true)} icon={<PlusOutlined />}>
				Criar agendamento
			</Button>

			<RightDrawer
				title="Criar agendamento"
				visible={visible}
				setVisible={setVisible}
				loading={loading}
				setLoading={setLoading}
				handleOk={() => form.submit()}
			>
				<ScheduleForm defaultDate={date} saveForm={saveAdd} form={form} loading={loading} setLoading={setLoading} />
			</RightDrawer>
		</>
	);
}
