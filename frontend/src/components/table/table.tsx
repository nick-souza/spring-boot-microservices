import { FormInstance, Table } from "antd";
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
	deleteModalName?: string;
	visibleDelete: boolean;
	setDeleteVisible: (visibleDelete: boolean) => void;
	deleteLoading: boolean;
	setDeleteLoading: (deleteLoading: boolean) => void;
	visibleEdit: boolean;
	setEditVisible: (visibleEdit: boolean) => void;
	editLoading: boolean;
	setEditLoading: (editLoading: boolean) => void;
	handleDeleteOk: () => void;
	form: FormInstance;
	editChildren: ReactNode;
	panelTitle: string;
}

export default function TableList({
	panelTitle,
	editChildren,
	form,
	handleDeleteOk,
	setEditLoading,
	visibleEdit,
	dataSource,
	editLoading,
	setEditVisible,
	deleteLoading,
	setDeleteLoading,
	fetchData,
	columns,
	loading,
	deleteModalName,
	visibleDelete,
	setDeleteVisible,
}: TableListProps) {
	return (
		<>
			<div className={style.list_wrapper}>
				<div onDoubleClick={fetchData} className={style.title}>
					<h3>{panelTitle}</h3>
				</div>
				<Table bordered columns={columns} loading={loading} dataSource={dataSource} size="middle" />
			</div>
			<DeleteItemModal
				name={deleteModalName}
				handleOk={() => handleDeleteOk()}
				visible={visibleDelete}
				setVisible={setDeleteVisible}
				loading={deleteLoading}
				setLoading={setDeleteLoading}
			/>
			<EditDrawer visible={visibleEdit} setVisible={setEditVisible} loading={editLoading} setLoading={setEditLoading} handleOk={() => form.submit()}>
				{editChildren}
				{/* <RoomEditForm saveForm={saveEdit} form={form} text={activeRoom?.name || "Room"} room={activeRoom} loading={editLoading} setLoading={setEditLoading} /> */}
			</EditDrawer>
		</>
	);
}
