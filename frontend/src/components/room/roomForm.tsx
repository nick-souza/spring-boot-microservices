import { Col, Form, FormInstance, Input, Row } from "antd";
import { useEffect } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";

interface RoomEditFormProps {
	form: FormInstance;
	room?: RoomInterface;
	saveForm: (values: RoomInterface) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export default function RoomForm({ room, form, saveForm, loading, setLoading }: RoomEditFormProps) {
	useEffect(() => {
		if (!room) {
			form.resetFields();
			return;
		}

		form.setFieldsValue({
			id: room?.id,
			name: room?.name,
			capacity: room?.capacity,
			creationDate: room?.creationDate,
			lastUpdate: room?.lastUpdate,
		});
	}, [room]);

	return (
		<>
			<Form form={form} layout="vertical" onFinish={(values) => saveForm(values)} disabled={loading}>
				<Row gutter={24}>
					{room && (
						<Form.Item name="id" label="Id" hidden>
							<Input disabled />
						</Form.Item>
					)}

					<Col span={24}>
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
							<Input placeholder="Nome" value={room?.name} />
						</Form.Item>
					</Col>

					<Col span={24}>
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
					</Col>

					{room && (
						<Col span={12}>
							<Form.Item name="creationDate" label="Data de criação">
								<Input disabled />
							</Form.Item>
						</Col>
					)}

					{room && (
						<Col span={12}>
							<Form.Item name="lastUpdate" label="Última atualização">
								<Input disabled />
							</Form.Item>
						</Col>
					)}
				</Row>
			</Form>
		</>
	);
}
