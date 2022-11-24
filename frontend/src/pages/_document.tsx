import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
	render() {
		return (
			<Html className="no-js css-menubar">
				<Head>
					<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
					<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet" />
					{/* <meta name="theme-color" content="#42a5f5"/> */}
				</Head>
				<body className="site-navbar-small custom-scrollbar">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
