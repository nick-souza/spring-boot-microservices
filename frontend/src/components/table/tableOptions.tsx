import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import style from "./style.module.css";

interface TableOptionsProps {
	isSelf: boolean;
	handleEdit: () => void;
	handleDelete: () => void;
	handleSchedules?: () => void;
	applyPermissions: boolean;
}

export default function TableOptions({ handleDelete, handleEdit, applyPermissions, isSelf, handleSchedules }: TableOptionsProps) {
	const { isAdmin } = useContext(AuthContext);

	const disableEdit = () => {
		if ((applyPermissions && isAdmin()) || isSelf || !applyPermissions) return false;
		else return true;
	};

	const findScheduleOption = {
		key: "opt_3",
		label: (
			<FindSchedulesOption
				onClick={() => {
					if (handleSchedules) handleSchedules();
				}}
			/>
		),
	};

	const items: MenuProps["items"] = [
		{
			key: "opt_1",
			label: (
				<EditOption
					onClick={() => {
						if ((applyPermissions && isAdmin()) || isSelf || !applyPermissions) handleEdit();
					}}
				/>
			),
			disabled: disableEdit(),
		},

		// Adicionando condicionalmente a opção de visualizar os agendamentos:
		...(handleSchedules ? [findScheduleOption] : []),

		{
			key: "opt_2",
			label: (
				<DeleteOption
					onClick={() => {
						if ((applyPermissions && isAdmin()) || isSelf) handleDelete();
					}}
					isAdmin={isAdmin()}
					isSelf={isSelf}
				/>
			),

			disabled: disableEdit(),
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
	isSelf?: boolean;
}

function EditOption({ onClick }: OptionBtnProps) {
	return (
		<div style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2 }} onClick={onClick}>
			<EditOutlined />
			<span style={{ marginLeft: 8 }}>Editar</span>
		</div>
	);
}

function DeleteOption({ onClick, isAdmin, isSelf }: OptionBtnProps) {
	return (
		<div
			className={isAdmin || isSelf ? "" : "btn_disabled"}
			style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2, color: "var(--danger)" }}
			onClick={onClick}
		>
			<DeleteOutlined />
			<span style={{ marginLeft: 8 }}>Excluir</span>
		</div>
	);
}

function FindSchedulesOption({ onClick }: OptionBtnProps) {
	return (
		<div style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2 }} onClick={onClick}>
			<SearchOutlined />
			<span style={{ marginLeft: 8 }}>Agendamentos</span>
		</div>
	);
}
