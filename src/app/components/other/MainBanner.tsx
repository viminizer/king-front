import React, { useEffect } from "react";
import ReusableButton from "./ResusableButton";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/main-banner.css";

const MainBanner = () => {
	const history = useHistory();
	const { setActiveTab } = useGlobals();
	/** Handlers */
	const checkMenuHandler = () => {
		history.push("/products");
	};
	useEffect(() => {
		setActiveTab("");
	}, []);
	return (
		<Box component="section" className="main-banner" id="home">
			{/* Main Content */}
			<Box className="sec-wp">
				<Container>
					<Grid container spacing={4}>
						{/* Left Column */}
						<Grid item xs={12} md={6}>
							<Box>
								<Typography variant="h1" className="h1-title">
									Welcome to <span>King Kebab</span>
								</Typography>
								<Typography className="banner-description">
									Step into the royal court of flavor at King Kebab, where every bite
									reigns supreme! Our restaurant specializes in authentic Turkish cuisine,
									bringing you a feast fit for a king.
								</Typography>
								<Typography className="banner-description">
									Join us for a truly majestic dining experience—because at King Kebab,
									you're always treated like royalty! 👑
								</Typography>
								<ReusableButton height={70} width={250} handleClick={checkMenuHandler}>
									Check our menu
								</ReusableButton>
							</Box>
						</Grid>

						{/* Right Column */}
						<Grid item xs={12} md={6}>
							<Box className="banner-img-wp">
								<Box className="banner-img"></Box>
							</Box>
							<Box className="banner-img-text">
								<Typography variant="h5" className="h5-title">
									Mix Grill Kebab
								</Typography>
								<Typography className="banner-description">
									Mouthwatering assortment of perfectly grilled lamb and chicken marinated
									in traditional spices.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};

export default MainBanner;
