import { Col, Form, FormInstance, Input, Row } from "antd";
import { useEffect } from "react";
import { UserInterface } from "../../interfaces/userInterface";

interface UserEditFormProps {
	user?: UserInterface | null;
	form: FormInstance;
	saveForm: (values: UserInterface) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export default function UserForm({ user, form, saveForm, loading, setLoading }: UserEditFormProps) {
	useEffect(() => {
		if (!user) return;

		form.setFieldsValue({
			id: user?.id,
			name: user?.name,
			lastName: user?.lastName,
			email: user?.email,
			statusDesc: user?.statusDesc,
			roleDesc: user?.roleDesc,
			creationDate: user?.creationDate,
			lastUpdate: user?.lastUpdate,
		});
	}, [user]);

	return (
		<>
			<Form form={form} layout="vertical" onFinish={(values) => saveForm(values)} disabled={loading}>
				<Row gutter={24}>
					{user && (
						<Form.Item name="id" hidden>
							<Input />
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
							<Input placeholder="Nome" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item
							name="lastName"
							label={"Last Name"}
							rules={[
								{
									required: true,
									message: "LastName é obrigatório",
								},
							]}
						>
							<Input placeholder="Last Name" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item
							name="email"
							label={"Email"}
							rules={[
								{
									required: true,
									message: "Email é obrigatório",
								},
							]}
						>
							<Input placeholder="Email" type="email" />
						</Form.Item>
					</Col>

					{user && (
						<Col span={12}>
							<Form.Item name="statusDesc" label={"Status"}>
								<Input disabled />
							</Form.Item>
						</Col>
					)}

					{user && (
						<Col span={12}>
							<Form.Item name="roleDesc" label={"Role"}>
								<Input disabled />
							</Form.Item>
						</Col>
					)}

					{user && (
						<Col span={12}>
							<Form.Item name="creationDate" label="Data de criação">
								<Input disabled />
							</Form.Item>
						</Col>
					)}

					{user && (
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
