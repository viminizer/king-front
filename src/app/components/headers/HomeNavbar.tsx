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
import { NavLink, useLocation } from "react-router-dom";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../libs/config";
import { Logout } from "@mui/icons-material";
import ReusableButton from "../other/ResusableButton";
import { useEffect, useState } from "react";
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
	const location = useLocation();
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

	const [isActive, setIsActive] = useState<string>(
		location.pathname === "/" ? "home" : location.pathname
	);
	console.log("IS active", isActive);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const { authMember } = useGlobals();
	const imagePath = authMember?.memberImage
		? `${serverApi}/${authMember?.memberImage}`
		: "icons/default-user.svg";

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	/**HANDLERS */
	const isActiveHandler = (str: string) => setIsActive(str);

	const handleScroll = () => {
		if (window.scrollY > 50) setIsScrolled(true);
		else setIsScrolled(false);
	};

	return (
		<div className={`home-navbar ${isScrolled ? "scrolled" : ""}`}>
			<Container className="navbar-container">
				<Stack className="menu">
					<Box>
						<NavLink to="/">
							<img src="icons/burak.svg" className="brand-logo" alt="brand-logo" />
						</NavLink>
					</Box>
					<Stack className="links">
						{["Home", "Products"].map((ele) => (
							<Box
								className={
									isActive === `${ele.toLowerCase()}` ? "active-link" : "nav-link"
								}
								onClick={() => isActiveHandler(ele.toLocaleLowerCase())}
							>
								<NavLink to={`/${ele.toLocaleLowerCase()}`}>{ele}</NavLink>
							</Box>
						))}
						{authMember ? (
							<Box
								className={isActive === "orders" ? "active-link" : "nav-link"}
								onClick={() => isActiveHandler("orders")}
							>
								<NavLink to="/orders" activeClassName={""}>
									Orders
								</NavLink>
							</Box>
						) : null}
						{authMember ? (
							<Box
								className={isActive === "member-page" ? "active-link" : "nav-link"}
								onClick={() => isActiveHandler("member-page")}
							>
								<NavLink to="/member-page" activeClassName={""}>
									My Page
								</NavLink>
							</Box>
						) : null}
						<Box
							className={isActive === "help" ? "active-link" : "nav-link"}
							onClick={() => isActiveHandler("help")}
						>
							<NavLink to="/help" activeClassName={""}>
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
								<ReusableButton
									width={150}
									height={40}
									handleClick={() => setLoginOpen(true)}
								>
									Login
								</ReusableButton>
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
