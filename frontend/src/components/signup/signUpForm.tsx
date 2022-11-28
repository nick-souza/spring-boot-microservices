import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Router from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { SignUpCredentials } from "../../interfaces/loginInterfaces";
import style from "../../pages/signup/style.module.css";

export default function SignUpForm() {
	const notify = useNotifications();
	const { signUp } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	async function onFinish({ name, email, password, confirmPassword }: SignUpCredentials) {
		if (password != confirmPassword) return notify.error("Passwords do not match");
		setLoading(true);
		await signUp({ name, email, password, confirmPassword }).finally(() => setLoading(false));
	}

	const handleLogin = () => Router.push("/");

	return (
		<Form name="nest-messages" onFinish={onFinish} form={form}>
			<Form.Item
				name="name"
				rules={[
					{
						required: true,
						message: "Nome é obrigatório",
					},
					{
						min: 4,
						message: "Nome deve conter pelo menos 4 caracteres",
					},
				]}
			>
				<Input prefix={<UserOutlined />} placeholder="Name" />
			</Form.Item>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: "Email é obrigatório",
					},
				]}
			>
				<Input prefix={<MailOutlined />} type="email" placeholder="Email" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: "Senha é obrigatório",
					},
					{
						min: 5,
						message: "Senha deve conter pelo menos 5 caracteres",
					},
				]}
			>
				<Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" visibilityToggle={true} />
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				rules={[
					{
						required: true,
						message: "Confirmação de senha é obrigatório",
					},
				]}
			>
				<Input.Password prefix={<LockOutlined />} type="password" placeholder="Confirm password" visibilityToggle={true} />
			</Form.Item>

			<Form.Item>
				<a className={style.login_btn} onClick={handleLogin}>
					Login
				</a>
				<Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading} className={style.signup_btn}>
					Register
				</Button>
			</Form.Item>
		</Form>
	);
}
