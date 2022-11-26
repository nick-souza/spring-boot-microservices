import { Button, Drawer, Form } from "antd";
import { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { api } from "../../service/api";
import RightDrawer from "../table/rightDrawer";
import ScheduleForm, { dateTimeFormat } from "./scheduleForm";
import { ScheduleFormResponse } from "./scheduleList";

interface CreateScheduleProps {
	fetchTable: () => void;
}

export default function CreateSchedule({ fetchTable }: CreateScheduleProps) {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();

	const notify = useNotifications();

	const saveAdd = async (schedule: ScheduleFormResponse) => {
		console.log(schedule);

		setLoading(true);

		await api
			.post("/schedule/add/", {
				roomId: schedule?.roomId,
				responsibleId: schedule?.responsibleId,
				bookingStart: schedule.bookingStart.format(dateTimeFormat),
				bookingEnd: schedule.bookingEnd.format(dateTimeFormat),
			})
			.then((res) => {
				console.log(res);
				notify.success("Agendamento editado com sucesso!");
			})
			.catch((err) => {
				notify.error(err.response.data.errorMessage || "Erro!");
			})
			.finally(() => {
				setVisible(false);
				setLoading(false);
				fetchTable();
			});
	};

	return (
		<>
			<Button onClick={() => setVisible(true)}>Criar agendamento</Button>

			<RightDrawer title="Criar agendamento" visible={visible} setVisible={setVisible} loading={loading} setLoading={setLoading} handleOk={() => form.submit()}>
				<ScheduleForm saveForm={saveAdd} form={form} loading={loading} setLoading={setLoading} />
			</RightDrawer>
		</>
	);
}
