import { Layout } from "antd";
import { ReactNode } from "react";
import NavBar from "./navBar";

interface LayoutCompProps {
	children: ReactNode;
}

export default function MainLayout({ children }: LayoutCompProps) {
	const { Content } = Layout;

	return (
		<>
			<Layout className="layout">
				<NavBar />

				<Content className="layout-content" style={{ padding: "0 50px" }}>
					{children}
				</Content>
			</Layout>
		</>
	);
}
