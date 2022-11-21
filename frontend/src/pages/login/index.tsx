import { Button, Checkbox, Form, Input } from "antd";
import { useContext } from "react";
import style from "./styles.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import LoginForm from "../../components/login/loginForm";

export default function Login() {
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
		<div className={style.form}>
			<LoginForm />
		</div>
	);
}
