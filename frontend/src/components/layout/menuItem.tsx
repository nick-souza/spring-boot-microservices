import NextLink from "next/link";
import style from "./style.module.css";

export type MenuItem = {
	link: string;
	icon?: string;
	text: string;
	// permission?: boolean;
	onClick?: () => void;
};

export default function MenuItem(item: MenuItem) {
	return (
		<NextLink href={item.link} className={style.navItem}>
			{item.icon && <i className={`navbar-item-icon ${item.icon}`}></i>}

			<span className={`navbar-item-title `}>{item.text}</span>
		</NextLink>
	);
}
