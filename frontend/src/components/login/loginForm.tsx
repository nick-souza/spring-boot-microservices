import { Button, Checkbox, Form, Input } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginForm() {
	const { signIn } = useContext(AuthContext);

	async function handleClick() {
		console.log("🌟🌟");
		await signIn({ email: "email@email.com", password: "123" });
	}

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		// TODO: Take this to the loginForm class;
		// TODO: Add the image above;

		<Form
			name="login"
			className="login-form"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			// labelCol={{
			// 	span: 100,
			// }}
			// wrapperCol={{
			// 	span: 100,
			// }}
		>
			<Form.Item
				// style={{ 'min-width': 100% }}
				name="username"
				rules={[
					{
						required: true,
						message: "Please input your Username!",
					},
				]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: "Please input your Password!",
					},
				]}
			>
				<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				<a href="">Criar conta</a>
			</Form.Item>
		</Form>
	);
}
