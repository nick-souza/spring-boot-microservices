import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { RoomInterface } from "../../interfaces/roomInterface";
import { api } from "../../service/api";
import { CreateEntityProps } from "../schedule/createSchedule";
import ScheduleForm from "../schedule/scheduleForm";
import RightDrawer from "../table/rightDrawer";
import RoomForm from "./roomForm";

export default function CreateRoom({ fetchTable }: CreateEntityProps) {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();

	const notify = useNotifications();

	const saveAdd = async (room: RoomInterface) => {
		console.log(room);

		setLoading(true);

		await api
			.post("/room/add/", {
				name: room?.name,
				capacity: room.capacity,
			})
			.then((res) => {
				notify.success("Sala criada com sucesso!");
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
			<Button onClick={() => setVisible(true)} icon={<PlusOutlined />}>
				Adicionar sala
			</Button>

			<RightDrawer title="Adicionar sala" visible={visible} setVisible={setVisible} loading={loading} setLoading={setLoading} handleOk={() => form.submit()}>
				<RoomForm text="Sala" saveForm={saveAdd} form={form} loading={loading} setLoading={setLoading} />
			</RightDrawer>
		</>
	);
}
