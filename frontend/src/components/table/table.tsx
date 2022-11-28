import { Button, FormInstance, Table } from "antd";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import style from "../../pages/room/style.module.css";
import EditDrawer from "./rightDrawer";

interface TableListProps {
	fetchData: () => void;
	columns: any; // FIXME:
	loading: boolean;
	dataSource: any;
	visibleEdit: boolean;
	setEditVisible: (visibleEdit: boolean) => void;
	editLoading: boolean;
	setEditLoading: (editLoading: boolean) => void;
	form: FormInstance;
	children: ReactNode;
	panelTitle?: string;
	addButton?: ReactNode;
}

export default function TableList({
	panelTitle,
	children,
	form,
	setEditLoading,
	visibleEdit,
	dataSource,
	editLoading,
	setEditVisible,
	fetchData,
	columns,
	loading,
	addButton,
}: TableListProps) {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div className={style.list_wrapper}>
				<div onDoubleClick={fetchData} className={style.title}>
					<h3>{panelTitle ? panelTitle : ""}</h3>
					{addButton}
				</div>
				<Table
					bordered
					columns={columns}
					loading={loading}
					dataSource={dataSource}
					size="middle"
					rowClassName={(record) =>
						(record.status && record.id == user?.id) || (record.bookingStart && record.responsibleId == user?.id && !record?.capacity) ? "active-row" : ""
					}
					rowKey={function (record): string {
						return record.id;
					}}
				/>
			</div>

			<EditDrawer
				title="Editar"
				visible={visibleEdit}
				setVisible={setEditVisible}
				loading={editLoading}
				setLoading={setEditLoading}
				handleOk={() => form.submit()}
			>
				{children}
			</EditDrawer>
		</>
	);
}
