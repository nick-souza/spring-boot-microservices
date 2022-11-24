import SignUpForm from "../../components/signup/signUpForm";
import style from "./style.module.css";

export default function SignUp() {
	return (
		<div className="form">
			<img src="./appointment_logo.svg" className={style.signup_logo} />
			<h3 className={style.signup_title}>SignUp</h3>
			<SignUpForm />
		</div>
	);
}
