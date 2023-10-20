import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { ResponseInterface } from "../../interfaces/responseInterface";
import { RoomInterface } from "../../interfaces/roomInterface";
import { api } from "../../service/api";
import { CreateEntityProps } from "../schedule/createSchedule";
import RightDrawer from "../table/rightDrawer";
import RoomForm from "./roomForm";

export default function CreateRoom({ fetchTable }: CreateEntityProps) {
	const [form] = Form.useForm();
	const notify = useNotifications();

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const saveAdd = async (room: RoomInterface) => {
		setLoading(true);

		try {
			const { success, errorMessage } = await api.post<ResponseInterface<RoomInterface>>("/room/add/", {
				name: room?.name,
				capacity: room.capacity,
			});

			if (!success) {
				setLoading(false);
				notify.error(errorMessage);
				return;
			}

			notify.success("Sala criada com sucesso!");
		} catch (error: any) {
			notify.error(error.response?.data?.errorMessage);
			return;
		}

		setLoading(false);
		setVisible(false);
		fetchTable();
	};

	return (
		<>
			<Button onClick={() => setVisible(true)} icon={<PlusOutlined />}>
				Adicionar sala
			</Button>

			<RightDrawer
				title="Adicionar sala"
				visible={visible}
				setVisible={setVisible}
				loading={loading}
				setLoading={setLoading}
				handleOk={() => form.submit()}
			>
				<RoomForm text="Sala" saveForm={saveAdd} form={form} loading={loading} setLoading={setLoading} />
			</RightDrawer>
		</>
	);
}
