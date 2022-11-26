import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserRole } from "../../enums/UserRole";
import style from "./style.module.css";

interface TableOptionsProps {
	handleEdit: () => void;
	handleDelete: () => void;
}

export default function TableOptions({ handleDelete, handleEdit }: TableOptionsProps) {
	const { isAdmin } = useContext(AuthContext);

	const items: MenuProps["items"] = [
		{
			key: "opt_1",
			label: (
				<EditOption
					onClick={() => {
						if (isAdmin()) handleEdit();
					}}
				/>
			),
			disabled: !isAdmin(),
		},
		{
			key: "opt_2",
			label: (
				<DeleteOption
					onClick={() => {
						if (isAdmin()) handleDelete();
					}}
					isAdmin={isAdmin()}
				/>
			),
			disabled: !isAdmin(),
		},
	];

	return (
		<Dropdown menu={{ items }} placement="bottomRight">
			<Button className={style.table_opt_btn}>
				<MoreOutlined />
			</Button>
		</Dropdown>
	);
}

interface OptionBtnProps {
	onClick: () => void;
	isAdmin?: boolean;
}

function EditOption({ onClick }: OptionBtnProps) {
	return (
		<div style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2 }} onClick={onClick}>
			<EditOutlined />
			<span style={{ marginLeft: 8 }}>Editar</span>
		</div>
	);
}

function DeleteOption({ onClick, isAdmin }: OptionBtnProps) {
	return (
		<div
			className={!isAdmin ? "btn_disabled" : ""}
			style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2, color: "var(--danger)" }}
			onClick={onClick}
		>
			<DeleteOutlined />
			<span style={{ marginLeft: 8 }}>Excluir</span>
		</div>
	);
}
