import { TextField } from "@material-ui/core";
import React from "react";

interface PageTitleProps {
	title: string;
}
const PageTitle = (props: PageTitleProps) => {
	const { title } = props;
	return (
		<div
			style={{
				width: "70px",
				height: "50px",
				margin: "150px",
				alignContent: "center",
				backgroundColor: "#f8f8ff",
			}}
		>
			<p
				style={{
					textTransform: "uppercase",
					display: "inline-block",
					background: "#f3f3f5",
					padding: "10px 20px",
					borderRadius: "60px",
					color: "#ff8243",
					fontSize: "30px",
					boxShadow: "9px 9px 12px #e4e4e4, -9px -9px 12px #ffffff",
				}}
			>
				{title}
			</p>
		</div>
	);
};

export default PageTitle;
