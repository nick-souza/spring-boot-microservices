import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html className="no-js css-menubar">
				<Head>
					<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.0/css/line.css"></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap"
						rel="stylesheet"
					/>
					<link rel="icon" href="page-icon.png" />
				</Head>

				<body className="site-navbar-small scrollbar-custom">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
