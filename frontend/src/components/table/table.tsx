import { FormInstance, Table } from "antd";
import { GetRowKey } from "antd/es/table/interface";
import { ReactNode } from "react";
import style from "../../pages/room/style.module.css";
import DeleteItemModal from "../table/deleteItemModal";
import EditDrawer from "../table/editDrawer";
// import RoomEditForm from "./roomEditForm";

interface TableListProps {
	fetchData: () => void;
	columns: any; // FIXME:
	loading: boolean;
	dataSource: any;
	// deleteModalName?: string;
	// visibleDelete: boolean;
	// setDeleteVisible: (visibleDelete: boolean) => void;
	// deleteLoading: boolean;
	// setDeleteLoading: (deleteLoading: boolean) => void;
	visibleEdit: boolean;
	setEditVisible: (visibleEdit: boolean) => void;
	editLoading: boolean;
	setEditLoading: (editLoading: boolean) => void;
	// handleDeleteOk: () => void;
	form: FormInstance;
	children: ReactNode;
	panelTitle: string;
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
}: TableListProps) {
	return (
		<>
			<div className={style.list_wrapper}>
				<div onDoubleClick={fetchData} className={style.title}>
					<h3>{panelTitle}</h3>
				</div>
				<Table
					bordered
					columns={columns}
					loading={loading}
					dataSource={dataSource}
					size="middle"
					rowKey={function (record): string {
						return record.id;
					}}
				/>
			</div>

			<EditDrawer visible={visibleEdit} setVisible={setEditVisible} loading={editLoading} setLoading={setEditLoading} handleOk={() => form.submit()}>
				{children}
			</EditDrawer>
		</>
	);
}
