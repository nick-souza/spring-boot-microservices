import { Menu } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import MenuItem from "./menuItem";
import style from "./style.module.css";

export default function NavMenu() {
	const router = useRouter();
	let path = router.pathname;

	// TODO: Add permission to access the users page;

	return (
		<Menu
			className="navbar-bg"
			mode="horizontal"
			defaultSelectedKeys={["2"]}
			items={[
				{
					key: "nav_1",
					className: `${path == "/schedule" ? "navbar-item-active" : ""}`,
					label: <MenuItem link="/schedule" icon="uil-schedule" text="Agendamentos" />,
				},
				{
					key: "nav_2",
					className: `${path == "/room" ? "navbar-item-active" : ""}`,
					label: <MenuItem link="/room" icon="uil-home" text="Salas" />,
				},
				{
					key: "nav_3",
					className: `${path == "/user" ? "navbar-item-active" : ""}`,
					label: <MenuItem link="/user" icon="uil-users-alt" text="Usuários" />,
				},
			]}
		/>
	);
}
