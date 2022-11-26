import { CheckOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { ReactNode } from "react";

interface EditDrawerProps {
	title: string;
	children: ReactNode;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	handleOk: () => void;
}

export default function RightDrawer({ title, children, visible, setVisible, loading, setLoading, handleOk }: EditDrawerProps) {
	const onClose = () => setVisible(false);

	return (
		<Drawer
			title={title}
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
