import { Form, FormInstance, Input } from "antd";
import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/userInterface";
import room from "../../pages/room";

interface UserEditFormProps {
	text: string;
	form: FormInstance;
	user?: UserInterface;
	saveForm: (values: UserInterface) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export default function UserEditForm({ user, text, form, saveForm, loading, setLoading }: UserEditFormProps) {
	const [title, setTitle] = useState(user?.name);

	useEffect(() => {
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
				<Form.Item name="id" label="Id">
					<Input disabled />
				</Form.Item>

				<Form.Item
					name="name"
					label="Nome"
					rules={[
						{
							min: 4,
							message: "Name must contain at least 4 characters",
						},
					]}
				>
					<Input placeholder="Nome" onChange={handleName} />
				</Form.Item>

				<Form.Item name="lastName" label={"Last Name"}>
					<Input placeholder="Last Name" />
				</Form.Item>

				<Form.Item name="email" label={"Email"}>
					<Input placeholder="Email" type="email" />
				</Form.Item>

				<Form.Item name="statusDesc" label={"Status"}>
					<Input disabled />
				</Form.Item>

				<Form.Item name="roleDesc" label={"Role"}>
					<Input disabled />
				</Form.Item>

				<Form.Item name="creationDate" label="Data de criação">
					<Input disabled />
				</Form.Item>

				<Form.Item name="lastUpdate" label="Última atualização">
					<Input disabled />
				</Form.Item>
			</Form>
		</>
	);
}
