import { Form, FormInstance, Input } from "antd";
import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/userInterface";

interface UserEditFormProps {
	text: string;
	form: FormInstance;
	user?: any | null;
	saveForm: (values: UserInterface) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export default function UserForm({ user, text, form, saveForm, loading, setLoading }: UserEditFormProps) {
	const [title, setTitle] = useState(user?.name);

	useEffect(() => {
		if (user)
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
				{user && (
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
					<Input placeholder="Nome" onChange={handleName} />
				</Form.Item>

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

				{user && (
					<Form.Item name="statusDesc" label={"Status"}>
						<Input disabled />
					</Form.Item>
				)}

				{user && (
					<Form.Item name="roleDesc" label={"Role"}>
						<Input disabled />
					</Form.Item>
				)}

				{user && (
					<Form.Item name="creationDate" label="Data de criação">
						<Input disabled />
					</Form.Item>
				)}

				{user && (
					<Form.Item name="lastUpdate" label="Última atualização">
						<Input disabled />
					</Form.Item>
				)}
			</Form>
		</>
	);
}
