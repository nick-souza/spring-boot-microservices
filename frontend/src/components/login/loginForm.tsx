import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Router from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { LoginCredentials } from "../../interfaces/login/loginInterfaces";
import style from "../../pages/login/styles.module.css";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const { signIn } = useContext(AuthContext);
	const notify = useNotifications();

	async function handleClick({ email, password }: LoginCredentials) {
		console.log("Success:", email, password); // TODO:
		setLoading(true);
		await signIn({ email: email, password: password }).finally(() => setLoading(false));
	}

	const handleSignUp = () => {
		Router.push("/signup");
	};

	return (
		<Form name="login" className="login-form" onFinish={handleClick}>
			{/*onFinishFailed={onFinishFailed}*/}
			<Form.Item
				style={{ minWidth: "100%" }}
				name="email"
				rules={[
					{
						required: true,
						message: "Email is required",
					},
				]}
			>
				<Input prefix={<UserOutlined />} type="email" placeholder="Email" />
			</Form.Item>
			<Form.Item
				style={{ minWidth: "100%" }}
				name="password"
				rules={[
					{
						required: true,
						message: "Password is required",
					},
				]}
			>
				<Input prefix={<LockOutlined />} type="password" placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<a className={style.sign_up_btn} onClick={handleSignUp}>
					Criar conta
				</a>
				<Button type="primary" htmlType="submit" className={style.login_btn} loading={loading}>
					Log in
				</Button>
			</Form.Item>
		</Form>
	);
}
