import React from "react";
import { Box, Container, Stack } from "@mui/material";
import styled from "styled-components";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import { useGlobals } from "../../hooks/useGlobals";

const Footers = styled.div`
	width: 100%;
	height: 590px;
	display: flex;
	background: #ffffff;
	background-size: cover;
`;

export default function Footer() {
	const { authMember } = useGlobals();
	return (
		<Footers>
			<Container>
				<Stack flexDirection={"row"} sx={{ mt: "94px" }}>
					<Stack flexDirection={"column"} style={{ width: "340px" }}>
						<Box>
							<img width={"100px"} src={"/icons/burak.svg"} />
						</Box>
						<Box className={"foot-desc-txt"}>
							Focusing on the gourmet Turkish breakfast as well as the youth society, King
							Kebab aims to bring Turkish cuisine back. King Kebab creates an illusion
							with its cuisine.
						</Box>
						<Box className="sns-context">
							<MuiLink href={"https://instagram.com/kingkebab.korea"} target="_blank">
								<Facebook className="sns-icon" />
							</MuiLink>
							<MuiLink href={"https://instagram.com/kingkebab.korea"} target="_blank">
								<Instagram className="sns-icon" />
							</MuiLink>
							<MuiLink href={"https://youtube.com/@kingkebab_korea"} target="_blank">
								<YouTube className="sns-icon" />
							</MuiLink>
						</Box>
					</Stack>
					<Stack sx={{ ml: "288px" }} flexDirection={"row"}>
						<Stack>
							<Box>
								<Box className={"foot-category-title"}>Bo'limlar</Box>
								<Box className={"foot-category-link"}>
									<Link to="/">Home</Link>
									<Link to="/products">Products</Link>
									{authMember && <Link to="/orders">Orders</Link>}
									<Link to="/help">Help</Link>
								</Box>
							</Box>
						</Stack>
						<Stack sx={{ ml: "100px" }}>
							<Box>
								<Box className={"foot-category-title"}>Find us</Box>
								<Box
									flexDirection={"column"}
									sx={{ mt: "20px" }}
									className={"foot-category-link"}
									justifyContent={"space-between"}
								>
									<Box flexDirection={"row"} className={"find-us"}>
										<span>L.</span>
										<div>Itaewon Station, Exit 3</div>
									</Box>
									<Box className={"find-us"}>
										<span>P.</span>
										<div>+82(0) 10 3925 9779</div>
									</Box>
									<Box className={"find-us"}>
										<span>E.</span>
										<div>ruxcodes@gmail.com</div>
									</Box>
									<Box className={"find-us"}>
										<span>H.</span>
										<div>Visit 24 hours</div>
									</Box>
								</Box>
							</Box>
						</Stack>
					</Stack>
				</Stack>
				<Stack
					style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
					sx={{ mt: "80px" }}
				></Stack>
				<Stack className={"copyright-txt"}>
					© Copyright King Kebab Korea, All rights reserved.
					{"  "}
					{new Date().getFullYear()}
				</Stack>
			</Container>
		</Footers>
	);
}
