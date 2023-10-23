import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "./logo";
import NavProfile from "./profile";
import style from "./style.module.css";

export default function NavBar() {
	const [visible, setVisible] = useState(false);

	const items = () => (
		<>
			<NavItem link="/schedule" icon="uil-schedule" text="Agendamentos" />
			<NavItem link="/room" icon="uil-home" text="Salas" />
			<NavItem link="/user" icon="uil-users-alt" text="Usuários" />
		</>
	);

	return (
		<header className={style.header}>
			<div className={style.logo}>
				<Logo />
			</div>

			<div className={style.menu}>
				{items()}

				<NavProfile />
			</div>

			<>
				<Button
					className={style.drawer_button}
					type="primary"
					shape="circle"
					icon={<MenuOutlined />}
					onClick={() => setVisible(true)}
				/>

				<Drawer
					destroyOnClose
					open={visible}
					placement="right"
					closeIcon={null}
					onClose={() => setVisible(false)}
					title={
						<div className={style.drawer_header}>
							<div className={style.logo}>
								<Logo />
							</div>

							<CloseOutlined onClick={() => setVisible(false)} />
						</div>
					}
				>
					<div className={style.menu_drawer}>{items()}</div>
				</Drawer>
			</>
		</header>
	);
}

type MenuItemType = {
	link: string;
	icon: string;
	text: string;
};

function NavItem({ link, icon, text }: MenuItemType) {
	const router = useRouter();
	let path = router.pathname;

	const isActive = path === link;

	return (
		<div className={`${style.wrapper} ${isActive ? style.active : ""}`}>
			<NextLink href={link} className={style.item}>
				{icon && <i className={`navbar-item-icon ${icon}`}></i>}
				<span className={style.text}>{text}</span>
			</NextLink>
		</div>
	);
}
