import SignUpForm from "../../components/signup/signUpForm";
import global from "../global.module.css";

export default function SignUp() {
	return (
		<div className={global.form}>
			<SignUpForm />
		</div>
	);
}
