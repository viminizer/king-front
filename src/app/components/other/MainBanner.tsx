import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import "../../../css/main-banner.css";
import ReusableButton from "./ResusableButton";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

const MainBanner = () => {
	const history = useHistory();
	const { setActiveTab } = useGlobals();
	/** Handlers */
	const checkMenuHandler = () => {
		history.push("/products");
		setActiveTab("products");
	};
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
									Welcome to <span>King Kebab</span> restaurant.
								</Typography>
								<Typography className="banner-description">
									This is Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Numquam eius vel tempore consectetur nesciunt? Nam eius tenetur
									recusandae optio aperiam.
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
									Sushi
								</Typography>
								<Typography>
									This is Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
