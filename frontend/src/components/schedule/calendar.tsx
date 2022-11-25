import { Calendar } from "antd";

export default function Calendar1() {
	return (
		<>
			<h1>Agendamentos</h1>
			<Calendar onSelect={(value) => console.log(value)} />;
		</>
	);
}
