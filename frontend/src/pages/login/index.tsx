import LoginForm from "../../components/login/loginForm";
import style from "./styles.module.css";
// import react_logo from "../../assets/react_logo.png";

export default function Login() {
	return (
		// TODO: Add the image above;
		<div className={style.form}>
			{/* <img src="../../images/react_logo.png"></img> */}
			<LoginForm />
		</div>
	);
}
