import { Form, FormInstance, Input } from "antd";
import { useEffect, useState } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";

interface RoomEditFormProps {
	text: string;
	form: FormInstance;
	room?: RoomInterface;
	saveForm: (values: RoomInterface) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export default function RoomForm({ room, text, form, saveForm, loading, setLoading }: RoomEditFormProps) {
	const [title, setTitle] = useState(room?.name);

	useEffect(() => {
		if (room)
			form.setFieldsValue({
				id: room?.id,
				name: room?.name,
				capacity: room?.capacity,
				creationDate: room?.creationDate,
				lastUpdate: room?.lastUpdate,
			});
	}, [room]);

	useEffect(() => {
		handleName();
	}, []);

	const handleName = () => {
		if (form.getFieldValue("name")) setTitle(form.getFieldValue("name"));
		else {
			form.setFieldValue("name", null);
			setTitle(text);
		}
	};

	return (
		<>
			<h1>{title}</h1>
			<Form form={form} layout="vertical" onFinish={(values) => saveForm(values)} disabled={loading}>
				{room && (
					<Form.Item name="id" label="Id">
						<Input disabled />
					</Form.Item>
				)}

				<Form.Item
					name="name"
					label="Nome"
					rules={[
						{
							required: true,
							message: "Nome é obrigatório",
						},
						{
							min: 4,
							message: "Name must contain at least 4 characters",
						},
					]}
				>
					<Input placeholder="Nome" onChange={handleName} value={room?.name} />
				</Form.Item>

				<Form.Item
					name="capacity"
					label={"Capacidade"}
					rules={[
						{
							required: true,
							message: "Capacidade é obrigatório",
						},
					]}
				>
					<Input placeholder="Capacity" type="number" />
				</Form.Item>

				{room && (
					<Form.Item name="creationDate" label="Data de criação">
						<Input disabled />
					</Form.Item>
				)}

				{room && (
					<Form.Item name="lastUpdate" label="Última atualização">
						<Input disabled />
					</Form.Item>
				)}
			</Form>
		</>
	);
}
