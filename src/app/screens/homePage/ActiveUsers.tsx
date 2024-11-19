import { Box, Container, Stack } from "@mui/material";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, Typography } from "@mui/joy";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../libs/types/member";
import { serverApi } from "../../../libs/config";

const topUsersRetriever = createSelector(retrieveTopUsers, (activeUsers) => ({
	activeUsers,
}));
export default function ActiveUsers() {
	const { activeUsers } = useSelector(topUsersRetriever);
	return (
		<div className="active-users-frame">
			<Container>
				<Stack className="main">
					<Box className="category-title">Active Users</Box>
					<Stack className="cards-frame">
						<CssVarsProvider>
							{activeUsers.length !== 0 ? (
								activeUsers.map((member: Member) => {
									return (
										<Card key={member._id} variant="outlined" className="card">
											<CardOverflow>
												<AspectRatio ratio="1">
													<img src={`${serverApi}/${member.memberImage}`} alt="" />
												</AspectRatio>
											</CardOverflow>

											<Stack flexDirection={"row"} justifyContent={"center"}>
												<Typography className="title">{member.memberNick}</Typography>
											</Stack>
										</Card>
									);
								})
							) : (
								<Box className="no-data">No Active Users!</Box>
							)}
						</CssVarsProvider>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
