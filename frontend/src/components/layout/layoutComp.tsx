import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Form, Layout, Tooltip } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { ReactNode, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { ResponseInterface } from "../../interfaces/responseInterface";
import { UserInterface } from "../../interfaces/userInterface";
import { api } from "../../service/api";
import UserSchedules from "../schedule/userScheduleList";
import RightDrawer from "../table/rightDrawer";
import UserForm from "../user/userForm";
import NavMenu from "./navMenu";
import style from "./style.module.css";

interface LayoutCompProps {
	children: ReactNode;
}

export default function LayoutComp({ children }: LayoutCompProps) {
	const { user, refreshUser, logout } = useContext(AuthContext);
	const { Header, Content } = Layout;

	const [loading, setLoading] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);
	const [visibleScheduleList, setVisibleScheduleList] = useState(false);

	const [form] = Form.useForm();
	const notify = useNotifications();

	const handleEdit = async (userForm: UserInterface) => {
		setLoading(true);

		const payload = {
			id: userForm?.id,
			name: userForm?.name,
			lastName: userForm?.lastName,
			email: userForm?.email,
		};

		try {
			const { success, data, errorMessage } = await api.put<ResponseInterface<UserInterface>>(
				`/user/update/${userForm?.id}`,
				payload
			);

			if (!success) {
				notify.error(errorMessage);
				setLoading(false);
				return;
			}
		} catch (error: any) {
			notify.error(error.response?.data?.errorMessage);
			return;
		}

		notify.success("Usuário editado com sucesso!");

		setLoading(false);
		setEditVisible(false);
		refreshUser();
	};

	const items: MenuItemType[] = [
		{
			key: "1",
			icon: (
				<Tooltip title={user?.email}>
					<i className="uil-user" />
				</Tooltip>
			),
			label: <span onClick={() => setEditVisible(true)}>{user?.name}</span>,
		},
		{
			key: "2",
			icon: <i className="uil-schedule" />,
			label: <span onClick={() => setVisibleScheduleList(true)}>Meus agendamentos</span>,
		},
		{
			key: "3",
			icon: <i className="uil-sign-out-alt" />,
			label: <span onClick={() => logout()}>Log out</span>,
		},
	];

	return (
		<>
			<Layout className="layout">
				<Header className="navbar-bg navbar-header">
					<div className={style.logo}>
						<span className={style.title}>Agendamentos</span>
					</div>

					<div className="navbar-actions">
						{/* TODO: Fix this */}
						<div style={{ width: "445px" }}>
							<NavMenu />
						</div>

						<Dropdown trigger={["click"]} menu={{ items }}>
							<Avatar className={style.user_profile} icon={<UserOutlined />} />
						</Dropdown>
					</div>
				</Header>

				<Content className="layout-content" style={{ padding: "0 50px" }}>
					{children}
				</Content>
			</Layout>

			<RightDrawer
				title={visibleEdit ? "Editar" : "Meus agendamentos"}
				visible={visibleEdit || visibleScheduleList}
				setVisible={visibleEdit ? setEditVisible : setVisibleScheduleList}
				loading={loading}
				setLoading={setLoading}
				drawerWidth={visibleEdit ? 620 : 820}
				okBtnName={"Ok"}
				handleOk={() => {
					if (visibleEdit) form.submit();
					else if (visibleScheduleList) setVisibleScheduleList(false);
				}}
			>
				{visibleEdit && (
					<UserForm
						saveForm={handleEdit}
						form={form}
						text={user?.name || "user"}
						user={user}
						loading={loading}
						setLoading={setLoading}
					/>
				)}
				{visibleScheduleList && <UserSchedules user={user} />}
			</RightDrawer>
		</>
	);
}
