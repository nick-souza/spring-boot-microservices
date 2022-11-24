import LoginForm from "../../components/login/loginForm";
import style from "./styles.module.css";

export default function Login() {
	return (
		<div className="form">
			<img src="./appointment_logo.svg" className={style.login_logo} />
			<h3 className={style.login_title}>Login</h3>
			<LoginForm />
		</div>
	);
}
