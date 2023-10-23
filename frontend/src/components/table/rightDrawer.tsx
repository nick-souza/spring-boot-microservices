import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { ReactNode } from "react";
import style from "./style.module.css";

interface EditDrawerProps {
	title?: string;
	children: ReactNode;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	onDrawerClose?: () => void;
	handleOk: () => void;
	drawerWidth?: number;
	okBtnName?: string;
}

export default function RightDrawer({
	title,
	children,
	visible,
	setVisible,
	loading,
	handleOk,
	drawerWidth,
	okBtnName,
	onDrawerClose,
}: EditDrawerProps) {
	const onCloseThis = () => {
		if (onDrawerClose) onDrawerClose();
		setVisible(false);
	};

	return (
		<Drawer
			destroyOnClose
			open={visible}
			closeIcon={null}
			onClose={onCloseThis}
			width={drawerWidth ? drawerWidth : 620}
			title={
				<div className={style.drawer_header}>
					{title}
					<CloseOutlined onClick={onCloseThis} />
				</div>
			}
			footer={
				<div className="text-right">
					<Button disabled={loading} onClick={() => setVisible(false)} style={{ marginRight: "5px" }}>
						Cancelar
					</Button>

					<Button
						disabled={loading}
						className="btn-success"
						onClick={handleOk}
						icon={<CheckOutlined />}
						color="var(--success)"
						loading={loading}
					>
						{okBtnName ? okBtnName : "Salvar"}
					</Button>
				</div>
			}
		>
			{children}
		</Drawer>
	);
}
