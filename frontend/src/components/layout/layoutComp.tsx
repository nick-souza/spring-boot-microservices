import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Form, Layout, Menu, Space, Tooltip } from "antd";
import { time } from "console";
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { UserInterface } from "../../interfaces/userInterface";
import { api } from "../../service/api";
import EditDrawer from "../table/rightDrawer";
import UserEditForm from "../user/userEditForm";
import NavMenu from "./navMenu";
import style from "./style.module.css";

interface LayoutCompProps {
	children: ReactNode;
}

export default function LayoutComp({ children }: LayoutCompProps) {
	const { user, logout } = useContext(AuthContext);
	const { Header, Content } = Layout;

	const [loading, setLoading] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);

	const [form] = Form.useForm();
	const notify = useNotifications();

	const saveEdit = async (userForm: UserInterface) => {
		setLoading(true);
		await api
			.put(`/user/update/${userForm?.id}`, {
				id: userForm.id,
				name: userForm.name,
				lastName: userForm.lastName,
				email: userForm.email != user?.email ? userForm.email : null,
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
				setLoading(false);
			});
	};

	const items = [
		{
			icon: (
				<Tooltip title={user?.email}>
					<i className="uil-user"></i>
				</Tooltip>
			),
			label: <span onClick={() => setEditVisible(true)}>{user?.name}</span>,
		},
		{
			icon: <i className="uil-sign-out-alt"></i>,
			label: <span onClick={logout}>Log out</span>,
		},
	] as any[];

	return (
		<>
			<Layout className="layout">
				<Header className="navbar-bg navbar-header">
					<div className={style.logo} />
					<div className="navbar-actions">
						<NavMenu />
						<Dropdown trigger={["click"]} overlay={<Menu className="custom-scrollbar" style={{ overflow: "auto", maxHeight: "80vh" }} items={items} />}>
							<Avatar className={style.user_profile} icon={<UserOutlined />}></Avatar>
						</Dropdown>
					</div>
				</Header>
				<Content className="layout-content" style={{ padding: "0 50px" }}>
					{children}
				</Content>
			</Layout>
			<EditDrawer title="Editar" visible={visibleEdit} setVisible={setEditVisible} loading={loading} setLoading={setLoading} handleOk={() => form.submit()}>
				<UserEditForm saveForm={saveEdit} form={form} text={user?.name || "user"} user={user} loading={loading} setLoading={setLoading} />
			</EditDrawer>
		</>
	);
}
