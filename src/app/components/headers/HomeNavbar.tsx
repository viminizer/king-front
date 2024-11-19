import Basket from "./Basket";
import {
	Box,
	Button,
	Container,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../libs/config";
import { Logout } from "@mui/icons-material";
import "./header.css";
interface HomeNavbarProps {
	anchorEl: HTMLElement | null;
	cartItems: CartItem[];
	onAdd: (item: CartItem) => void;
	onRemove: (item: CartItem) => void;
	onDelete: (item: CartItem) => void;
	onDeleteAll: () => void;
	setSignupOpen: (isOpen: boolean) => void;
	setLoginOpen: (isOpen: boolean) => void;
	handleCloseLogout: () => void;
	handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
	handleLogoutRequest: () => void;
}

export function HomeNavbar(props: HomeNavbarProps) {
	const {
		cartItems,
		onAdd,
		onDelete,
		onDeleteAll,
		onRemove,
		setSignupOpen,
		setLoginOpen,
		anchorEl,
		handleCloseLogout,
		handleLogoutRequest,
		handleLogoutClick,
	} = props;

	const { authMember } = useGlobals();
	const imagePath = authMember?.memberImage
		? `${serverApi}/${authMember?.memberImage}`
		: "icons/default-user.svg";

	return (
		<div className="home-navbar">
			<Container className="navbar-container">
				<Stack className="menu">
					<Box>
						<NavLink to="/">
							<img src="icons/burak.svg" className="brand-logo" alt="brand-logo" />
						</NavLink>
					</Box>
					<Stack className="links">
						<Box className={"nav-link"}>
							<NavLink to="/" activeClassName={"active"}>
								Home
							</NavLink>
						</Box>
						<Box className={"nav-link"}>
							<NavLink to="/products" activeClassName={"underline"}>
								Products
							</NavLink>
						</Box>
						{authMember ? (
							<Box className={"nav-link"}>
								<NavLink to="/orders" activeClassName={"underline"}>
									Orders
								</NavLink>
							</Box>
						) : null}
						{authMember ? (
							<Box className={"nav-link"}>
								<NavLink to="/member-page" activeClassName={"underline"}>
									My Page
								</NavLink>
							</Box>
						) : null}
						<Box className={"nav-link"}>
							<NavLink to="/help" activeClassName={"underline"}>
								Help
							</NavLink>
						</Box>
						<Basket
							cartItems={cartItems}
							onAdd={onAdd}
							onDelete={onDelete}
							onDeleteAll={onDeleteAll}
							onRemove={onRemove}
						/>
						{!authMember ? (
							<Box>
								<Button
									variant="contained"
									className="login-button"
									onClick={() => setLoginOpen(true)}
								>
									Login
								</Button>
							</Box>
						) : (
							<img
								style={{ cursor: "pointer" }}
								className="user-avatar"
								src={imagePath}
								aria-haspopup={"true"}
								alt="profile-img"
								onClick={handleLogoutClick}
							/>
						)}
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							id="account-menu"
							onClose={handleCloseLogout}
							onClick={handleCloseLogout}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={handleLogoutRequest}>
								<ListItemIcon>
									<Logout fontSize="small" style={{ color: "blue" }} />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
