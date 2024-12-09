import { Box, Container, Stack } from "@mui/material";
import {
	CardCover,
	Card,
	CardContent,
	CardOverflow,
	CssVarsProvider,
	Typography,
} from "@mui/joy";
import { DescriptionOutlined, Visibility } from "@mui/icons-material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePopularDishes } from "./selector";
import { serverApi } from "../../../libs/config";
import { Product } from "../../../libs/types/product";

const popularDishesRetriever = createSelector(retrievePopularDishes, (popularDishes) => ({
	popularDishes,
}));

export default function PopularDishes() {
	const { popularDishes } = useSelector(popularDishesRetriever);

	return (
		<div className="popular-dishes-frame">
			<Container>
				<Stack className="popular-section">
					<Box className="category-title">Popular Dishes</Box>
					<Stack className="cards-frame">
						{popularDishes.length !== 0 ? (
							popularDishes.map((ele: Product) => {
								const imagePath = `${serverApi}/${ele.productImages[0]}`;
								return (
									<CssVarsProvider key={ele._id}>
										<Card className={"card"}>
											<CardCover>
												<img src={imagePath} alt="" />
											</CardCover>
											<CardCover className="card-cover" />
											<CardContent sx={{ justifyContent: "flex-end" }}>
												<Stack flexDirection={"row"} justifyContent={"space-between"}>
													<Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
														{ele.productName}
													</Typography>
													<Typography
														sx={{
															fontWeight: "md",
															color: "neutral.300",
															alignItems: "center",
															display: "flex",
														}}
													>
														{ele.productViews}
														<Visibility sx={{ fontSize: 25, marginLeft: "5px" }} />
													</Typography>
												</Stack>
											</CardContent>
											<CardOverflow
												sx={{
													display: "flex",
													gap: 1.5,
													py: 1.5,
													px: "var(--Card-padding)",
													borderTop: "1px solid",
													height: "60px",
												}}
											>
												<Typography
													startDecorator={<DescriptionOutlined />}
													textColor="neutral.300"
													className="prod-desc"
												>
													{ele.productDesc}
												</Typography>
											</CardOverflow>
										</Card>
									</CssVarsProvider>
								);
							})
						) : (
							<Box className="no-data">Popular products are not available!</Box>
						)}
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
