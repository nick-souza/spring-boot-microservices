import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Form, Tooltip } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { ResponseInterface } from "../../interfaces/responseInterface";
import { UserInterface } from "../../interfaces/userInterface";
import { api } from "../../service/api";
import UserSchedules from "../schedule/userScheduleList";
import RightDrawer from "../table/rightDrawer";
import UserForm from "../user/userForm";
import style from "./style.module.css";

export default function NavProfile() {
	const [form] = Form.useForm();
	const notify = useNotifications();

	const { user, refreshUser, logout } = useContext(AuthContext);

	const [loading, setLoading] = useState(false);
	const [visibleEdit, setEditVisible] = useState(false);
	const [visibleScheduleList, setVisibleScheduleList] = useState(false);

	const handleEdit = async (values: UserInterface) => {
		if (!values?.id) return;

		setLoading(true);

		const payload = {
			id: values?.id,
			name: values?.name,
			lastName: values?.lastName,
			email: values?.email,
		};

		try {
			const { success, data, errorMessage } = await api.put<ResponseInterface<UserInterface>>(
				`/user/update/${values?.id}`,
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
			onClick: () => setEditVisible(true),
			label: <span>{user?.name}</span>,
			icon: (
				<Tooltip title={user?.email}>
					<i className="uil-user" />
				</Tooltip>
			),
		},
		{
			key: "2",
			onClick: () => setVisibleScheduleList(true),
			label: <span>Meus agendamentos</span>,
			icon: <i className="uil-schedule" />,
		},
		{
			key: "3",
			onClick: () => logout(),
			label: <span>Log out</span>,
			icon: <i className="uil-sign-out-alt" />,
		},
	];

	return (
		<>
			<Dropdown trigger={["click"]} placement="bottomRight" menu={{ items }} arrow>
				<Avatar className={style.user_profile} icon={<UserOutlined />} />
			</Dropdown>

			<RightDrawer
				title={visibleEdit ? "Editar perfil" : "Meus agendamentos"}
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
				{visibleEdit && <UserForm saveForm={handleEdit} form={form} user={user} loading={loading} setLoading={setLoading} />}

				{visibleScheduleList && <UserSchedules user={user} />}
			</RightDrawer>
		</>
	);
}
