import type { ColumnsType } from "antd/es/table";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { UserInterface } from "../../interfaces/userInterface";
import { api } from "../../service/api";
import { SettingOutlined } from "@ant-design/icons";
import TableOptions from "../table/tableOptions";
import TableList from "../table/table";
import UserEditForm from "./userEditForm";

export default function UserList() {
	const [users, setUsers] = useState<UserInterface[]>();
	const [loading, setLoading] = useState(false);
	const [activeUser, setActiveUser] = useState<UserInterface>();
	const [visibleDelete, setDeleteVisible] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const notify = useNotifications();

	const [form] = Form.useForm();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		await api
			.get("/user/")
			.then((res) => {
				if (res.data.success) setUsers(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleDelete = async () => {
		setDeleteLoading(true);
		await api
			.delete(`/user/delete/${activeUser?.id}`)
			.then((res) => {
				notify.success("Usuário excluído com sucesso!");
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setDeleteVisible(false);
				setDeleteLoading(false);
				fetchData();
			});
	};

	const saveEdit = async (user: UserInterface) => {
		setEditLoading(true);
		console.log(user);
		await api
			.put(`/user/update/${user?.id}`, {
				id: user.id,
				name: user.name,
				lastName: user.lastName,
				email: user.email != activeUser?.email ? user.email : null,
			})
			.then((res) => {
				console.log(res);
				notify.success("Usuário editado com sucesso!");
			})
			.catch((err) => {
				notify.error(err.response.data.errorMessage || "Erro!");
			})
			.finally(() => {
				setEditVisible(false);
				setEditLoading(false);
				fetchData();
			});
	};

	const columns: ColumnsType<UserInterface> = [
		{
			key: "user_name",
			title: "Name",
			dataIndex: "name",
		},
		{
			key: "user_lastName",
			title: "Last name",
			dataIndex: "lastName",
		},
		{
			key: "user_email",
			title: "Email",
			dataIndex: "email",
		},
		{
			key: "user_statusDesc",
			title: "Status",
			dataIndex: "statusDesc",
		},
		{
			key: "user_roleDesc",
			title: "Papel",
			dataIndex: "roleDesc",
		},
		{
			key: "user_creationDate",
			title: "Created at",
			dataIndex: "creationDate",
			align: "right",
		},
		{
			key: "user_lastUpdate",
			title: "Last updated at",
			dataIndex: "lastUpdate",
			align: "right",
		},
		{
			key: "user_opt",
			title: <SettingOutlined />,
			align: "center",
			width: 60,
			dataIndex: "operation",
			render: (_, user: UserInterface) => (
				<TableOptions
					handleDelete={() => {
						setDeleteVisible(true);
						setActiveUser(user);
					}}
					handleEdit={() => {
						setActiveUser(user);
						setEditVisible(true);
					}}
				/>
			),
		},
	];

	return (
		<>
			<TableList
				panelTitle="Usuários"
				editChildren={
					<UserEditForm saveForm={saveEdit} form={form} text={activeUser?.name || "user"} user={activeUser} loading={editLoading} setLoading={setEditLoading} />
				}
				form={form}
				handleDeleteOk={() => handleDelete()}
				setEditLoading={setEditLoading}
				visibleEdit={visibleEdit}
				columns={columns}
				editLoading={editLoading}
				setEditVisible={setEditVisible}
				deleteLoading={deleteLoading}
				setDeleteLoading={setDeleteLoading}
				fetchData={fetchData}
				dataSource={users}
				loading={loading}
				deleteModalName={activeUser?.name}
				visibleDelete={visibleDelete}
				setDeleteVisible={setDeleteVisible}
			/>
		</>
	);
}
