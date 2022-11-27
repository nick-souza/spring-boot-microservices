import { SettingOutlined } from "@ant-design/icons";
import { Form, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserRole } from "../../enums/UserRole";
import { useNotifications } from "../../hooks/useNotifications";
import { UserInterface } from "../../interfaces/userInterface";
import { api } from "../../service/api";
import DeleteItemModal from "../table/deleteItemModal";
import TableList from "../table/table";
import TableOptions from "../table/tableOptions";
import UserForm from "./userForm";

export default function UserList() {
	const { user: loggedUser } = useContext(AuthContext);
	const [users, setUsers] = useState<UserInterface[]>();
	const [activeUser, setActiveUser] = useState<UserInterface>();
	const [loading, setLoading] = useState(false);
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
		if (activeUser?.id != loggedUser?.id) {
			setDeleteLoading(true);
			await api
				.delete(`/user/delete/${activeUser?.id}`)
				.then((res) => {
					if (res.data.success) notify.success("Usuário excluído com sucesso!");
					else notify.error(res?.data?.errorMessage);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setDeleteVisible(false);
					setDeleteLoading(false);
					fetchData();
				});
		} else {
			setDeleteVisible(false);
			notify.error("Você não pode se excluir!");
		}
	};

	const saveEdit = async (user: UserInterface) => {
		setEditLoading(true);
		await api
			.put(`/user/update/${user?.id}`, {
				id: user.id,
				name: user.name,
				lastName: user.lastName,
				email: user.email != activeUser?.email ? user.email : null,
			})
			.then((res) => {
				if (res.data.success) notify.success("Usuário editado com sucesso!");
				else notify.error(res?.data?.errorMessage);
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
			title: "Nome",
			dataIndex: "name",
			render: (_, user: UserInterface) => (
				<span>
					{user.name}
					{user?.id == loggedUser?.id && (
						<Tag className="user-tag" color="geekblue">
							Você
						</Tag>
					)}
				</span>
			),
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
			title: "Criado em",
			dataIndex: "creationDate",
			align: "right",
		},
		{
			key: "user_lastUpdate",
			title: "Ultima atualização",
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
				form={form}
				setEditLoading={setEditLoading}
				visibleEdit={visibleEdit}
				columns={columns}
				editLoading={editLoading}
				setEditVisible={setEditVisible}
				fetchData={fetchData}
				dataSource={users}
				loading={loading}
			>
				<UserForm saveForm={saveEdit} form={form} text={activeUser?.name || "user"} user={activeUser} loading={editLoading} setLoading={setEditLoading} />
			</TableList>
			<DeleteItemModal
				name={activeUser?.name}
				handleOk={handleDelete}
				visible={visibleDelete}
				setVisible={setDeleteVisible}
				loading={deleteLoading}
				setLoading={setDeleteLoading}
			/>
		</>
	);
}
