import { CheckOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { ReactNode } from "react";

interface EditDrawerProps {
	text?: string;
	children: ReactNode;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	handleOk: () => void;
}

export default function EditDrawer({ text, children, visible, setVisible, loading, setLoading, handleOk }: EditDrawerProps) {
	const onClose = () => setVisible(false);

	return (
		<Drawer
			title="Editar"
			width={620}
			onClose={onClose}
			open={visible}
			destroyOnClose
			footer={
				<div className="text-right">
					<Button disabled={loading} onClick={() => setVisible(false)} style={{ marginRight: "5px" }}>
						Cancelar
					</Button>
					<Button disabled={loading} className="btn-success" onClick={handleOk} icon={<CheckOutlined />} color="var(--success)" loading={loading}>
						Salvar
					</Button>
				</div>
			}
		>
			{children}
		</Drawer>
	);
}
