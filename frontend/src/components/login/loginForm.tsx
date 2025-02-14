import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Router from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginCredentials } from "../../interfaces/loginInterfaces";
import style from "../../pages/login/styles.module.css";

export default function LoginForm() {
	const { login } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const handleClick = async ({ email, password }: LoginCredentials) => {
		setLoading(true);

		await login({ email: email, password: password }).finally(() => setLoading(false));
	};

	const handleSignUp = () => Router.push("/signup");

	return (
		<Form name="login" className="login-form" onFinish={handleClick}>
			<Form.Item
				style={{ minWidth: "100%" }}
				name="email"
				rules={[
					{
						required: true,
						message: "Email é obrigatório",
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
						message: "Senha é obrigatório",
					},
				]}
			>
				<Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" visibilityToggle={true} />
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
