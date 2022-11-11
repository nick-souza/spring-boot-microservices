import { GetServerSideProps } from "next";
import SignUpForm from "../../components/signup/signUpForm";
import style from "./style.module.css";
import { parseCookies } from "nookies";

export default function SignUp() {
	return (
		<div className="form">
			<img src="./appointment_logo.svg" className={style.signup_logo} />
			<h3 className={style.signup_title}>SignUp</h3>
			<SignUpForm />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { ["auth.token"]: token } = parseCookies(ctx);

	if (token) {
		return {
			redirect: {
				destination: "/schedule",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
