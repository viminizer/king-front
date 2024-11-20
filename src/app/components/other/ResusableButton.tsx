import React from "react";
import { Button } from "@mui/material";
import "../../../css/button.css";

interface ReusableButtonProps {
	children: React.ReactNode;
	handleClick: () => void;
	width?: number;
	height?: number;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
	width,
	height,
	handleClick,
	children,
}) => {
	return (
		<a
			className="reusable-btn"
			style={{ width: width, height: height }}
			onClick={handleClick}
		>
			{children}
		</a>
	);
};

export default ReusableButton;
