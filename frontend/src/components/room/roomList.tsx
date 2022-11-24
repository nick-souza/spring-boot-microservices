import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";
import { api } from "../../service/api";
import style from "../../pages/room/style.module.css";

export default function RoomList() {
	const [rooms, setRooms] = useState<RoomInterface[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		await api
			.get("/room/")
			.then((res) => {
				if (res.data.success) setRooms(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// const handleTableChange = (
	// 	pagination: TablePaginationConfig,
	// 	filters: Record<string, FilterValue>,
	// 	sorter: SorterResult<DataType>,
	//   ) => {
	// 	setTableParams({
	// 	  pagination,
	// 	  filters,
	// 	  ...sorter,
	// 	});
	//   };

	const columns: ColumnsType<RoomInterface> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Room capacity",
			dataIndex: "capacity",
			key: "capacity",
			align: "right",
		},
		{
			title: "Created at",
			dataIndex: "creationDate",
			key: "creationDate",
			align: "right",
		},
		{
			title: "Last updated at",
			dataIndex: "lastUpdate",
			key: "lastUpdate",
			align: "right",
		},
	];

	return (
		<>
			<div className={style.list_wrapper}>
				<div className={style.title}>
					<h3>Salas disponíveis</h3>
				</div>
				<Table columns={columns} loading={loading} dataSource={rooms} />
			</div>
		</>
	);
}
