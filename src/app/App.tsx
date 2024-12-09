import React, { useState } from "react";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import ProductsPage from "./screens/productsPage";
import HelpPage from "./screens/helpPage";
import Footer from "./components/footer";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import MemberService from "./services/MemberService";
import MainBanner from "./components/other/MainBanner";
import { Route, Switch, useLocation } from "react-router-dom";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../libs/sweetAlert";
import { Messages } from "../libs/config";
import { useGlobals } from "./hooks/useGlobals";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import PageTitle from "./components/other/PageTitle";

function App() {
	const location = useLocation();

	const { setAuthMember } = useGlobals();
	const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = useBasket();
	const [signupOpen, setSignupOpen] = useState<boolean>(false);
	const [loginOpen, setLoginOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	/** HANDLERS */
	const handleSignupClose = () => setSignupOpen(false);
	const handleLoginClose = () => setLoginOpen(false);
	const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
	};
	const handleCloseLogout = () => setAnchorEl(null);

	const handleLogoutRequest = async () => {
		try {
			const member = new MemberService();
			await member.logout();
			await sweetTopSuccessAlert("Successfull", 2000);
			setAuthMember(null);
		} catch (err) {
			console.log(err);
			sweetErrorHandling(Messages.error1);
		}
	};

	return (
		<>
			<HomeNavbar
				cartItems={cartItems}
				onAdd={onAdd}
				onDelete={onDelete}
				onDeleteAll={onDeleteAll}
				onRemove={onRemove}
				setSignupOpen={setSignupOpen}
				setLoginOpen={setLoginOpen}
				anchorEl={anchorEl}
				handleLogoutClick={handleLogoutClick}
				handleCloseLogout={handleCloseLogout}
				handleLogoutRequest={handleLogoutRequest}
			/>
			{location.pathname === "/" ? <MainBanner /> : <></>}
			<Switch>
				<Route path="/products">
					<ProductsPage onAdd={onAdd} />
				</Route>
				<Route path="/member-page">
					<UserPage />
				</Route>
				<Route path="/orders">
					<OrdersPage />
				</Route>
				<Route path="/help">
					<HelpPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
			<Footer />
			<AuthenticationModal
				signupOpen={signupOpen}
				loginOpen={loginOpen}
				handleLoginClose={handleLoginClose}
				handleSignupClose={handleSignupClose}
			/>
		</>
	);
}

export default App;
