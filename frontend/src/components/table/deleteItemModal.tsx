import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";

interface DeleteModalProps {
	name?: string;
	handleOk: () => void;
	setVisible: (visible: boolean) => void;
	visible: boolean;
	setLoading: (loading: boolean) => void;
	loading: boolean;
}

export default function DeleteItemModal({ name, handleOk, visible, setVisible, loading, setLoading }: DeleteModalProps) {
	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<Modal
			title="Excluir"
			open={visible}
			onOk={handleOk}
			confirmLoading={loading}
			onCancel={handleCancel}
			cancelText="Cancelar"
			okText="Excluir"
			okButtonProps={{
				icon: <DeleteOutlined />,
				danger: true,
			}}
		>
			<div>
				<p>Tem certeza que deseja excluir "{name}"?</p>
			</div>
		</Modal>
	);
}
