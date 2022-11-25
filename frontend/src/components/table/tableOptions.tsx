import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import style from "./style.module.css";

interface TableOptionsProps {
	handleEdit: () => void;
	handleDelete: () => void;
}

export default function TableOptions({ handleDelete, handleEdit }: TableOptionsProps) {
	const items: MenuProps["items"] = [
		{
			key: "opt_1",
			label: <EditOption onClick={handleEdit} />,
		},
		{
			key: "opt_2",
			label: <DeleteOption onClick={handleDelete} />,
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
}

function EditOption({ onClick }: OptionBtnProps) {
	return (
		<div style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2 }} onClick={onClick}>
			<EditOutlined />
			<span style={{ marginLeft: 8 }}>Editar</span>
		</div>
	);
}

function DeleteOption({ onClick }: OptionBtnProps) {
	return (
		<div style={{ paddingRight: 6, paddingLeft: 6, paddingTop: 2, paddingBottom: 2, color: "var(--danger)" }} onClick={onClick}>
			<DeleteOutlined />
			<span style={{ marginLeft: 8 }}>Excluir</span>
		</div>
	);
}
