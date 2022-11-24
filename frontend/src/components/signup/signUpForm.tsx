import { KeyOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form/dist/useForm";
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

		// form.

		setLoading(true);

		await signUp({ name, email, password, confirmPassword }).finally(() => setLoading(false));
	}

	return (
		<Form name="nest-messages" onFinish={onFinish} form={form}>
			<Form.Item
				name="name"
				rules={[
					{
						required: true,
						message: "Name is required",
					},
					{
						min: 4,
						message: "Name must contain at least 4 characters",
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
						message: "Email is required",
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
						message: "Password is required",
					},
					{
						min: 5,
						message: "Password must contain at least 5 characters",
					},
				]}
			>
				<Input prefix={<LockOutlined />} type="password" placeholder="Password" />
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				rules={[
					{
						required: true,
						message: "Confirm password is required",
					},
				]}
			>
				<Input prefix={<LockOutlined />} type="password" placeholder="Confirm password" />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading} className={style.signup_btn}>
					Register
				</Button>
			</Form.Item>
		</Form>
	);
}
