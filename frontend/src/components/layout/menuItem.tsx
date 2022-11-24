import { LockFilled } from "@ant-design/icons";
import { useMemo } from "react";
import NextLink from "next/link";
import style from "./style.module.css";

export type MenuItem = {
	link: string;
	icon?: string;
	text: string;
	permission?: boolean; // TODO: Add permission;
	onClick?: () => void;
};

export default function MenuItem(item: MenuItem) {
	return (
		<NextLink href={item.link} className={style.navItem}>
			{item.icon && <i className={`navbar-item-icon ${item.icon}`}></i>}

			<span className={`navbar-item-title `}>
				{item.text}
				<PermissionIcon permission={item.permission} />
			</span>
		</NextLink>
	);
}

type PermissionIconProps = {
	permission?: boolean;
};

export function PermissionIcon({ permission }: PermissionIconProps) {
	const print = useMemo(() => permission === false, [permission]);

	return <>{print && <span style={{ marginLeft: "5px" }}>{permission === false && <LockFilled style={{ color: "var(--danger)" }} />}</span>}</>;
}
