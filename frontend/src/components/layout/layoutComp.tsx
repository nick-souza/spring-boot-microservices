import { Layout, Menu } from "antd";
import { ReactNode } from "react";
import NavMenu from "./navMenu";
import style from "./style.module.css";

interface LayoutCompProps {
	children: ReactNode;
}

export default function LayoutComp({ children }: LayoutCompProps) {
	const { Header, Content, Footer } = Layout;

	return (
		<>
			<Layout className="layout">
				<Header className="navbar-bg navbar-header">
					<div className={style.logo} />
					<div className="navbar-actions">
						<NavMenu />
						<div className={style.user_profile} />
					</div>
				</Header>
				<Content className="layout-content" style={{ padding: "0 50px" }}>
					{children}
				</Content>
				{/* <Footer style={{ textAlign: "center" }}>Nicolas Sá de Souza</Footer> */}
			</Layout>
		</>
	);
}
