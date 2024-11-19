import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import OrderService from "../../services/OrderService";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { TabContext } from "@mui/lab";
import { LocationOn } from "@mui/icons-material";
import { Order, OrderInquiry } from "../../../libs/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { MemberType } from "../../../libs/enums/member.enum";
import { serverApi } from "../../../libs/config";
import "../../../css/order.css";

const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (orders: Order[]) => dispatch(setPausedOrders(orders)),
	setProcessOrders: (orders: Order[]) => dispatch(setProcessOrders(orders)),
	setFinishedOrders: (orders: Order[]) => dispatch(setFinishedOrders(orders)),
});

export default function OrdersPage() {
	const [value, setValue] = useState("1");
	const { authMember, orderBuilder } = useGlobals();
	const history = useHistory();
	const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
		page: 1,
		limit: 5,
		orderStatus: OrderStatus.PAUSE,
	});

	const { setProcessOrders, setPausedOrders, setFinishedOrders } = actionDispatch(
		useDispatch()
	);

	useEffect(() => {
		const order = new OrderService();
		order
			.getMyOrders({
				...orderInquiry,
				orderStatus: OrderStatus.PAUSE,
			})
			.then((data: Order[]) => {
				setPausedOrders(data);
			})
			.catch((err) => console.log(err));

		order
			.getMyOrders({
				...orderInquiry,
				orderStatus: OrderStatus.PROCESS,
			})
			.then((data) => setProcessOrders(data))
			.catch((err) => console.log(err));

		order
			.getMyOrders({
				...orderInquiry,
				orderStatus: OrderStatus.FINISH,
			})
			.then((data) => setFinishedOrders(data))
			.catch((err) => console.log(err));
	}, [orderBuilder, orderInquiry]);

	/**Handlers */
	const handleChange = (e: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	if (!authMember) history.push("/");
	return (
		<div className="order-page">
			<Container className="order-container">
				<Stack className="order-left">
					<TabContext value={value}>
						<Box className="order-nav-frame">
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
									className="table-list"
								>
									<Tab label="PAUSED ORDERS" value={"1"} />
									<Tab label="PROCESS ORDERS" value={"2"} />
									<Tab label="FINISHED ORDERS" value={"3"} />
								</Tabs>
							</Box>
						</Box>
						<Stack className="order-main-content">
							<PausedOrders setValue={setValue} />
							<ProcessOrders setValue={setValue} />
							<FinishedOrders />
						</Stack>
					</TabContext>
				</Stack>
				<Stack className="order-right">
					<Box className="order-info-box">
						<Box className="member-box">
							<div className="order-user-img">
								<img
									src={
										authMember?.memberImage
											? `${serverApi}/${authMember.memberImage}`
											: "/icons/default-user.svg"
									}
									className="order-user-avatar"
								/>
								<div className="order-user-icon-box">
									<img
										src={
											authMember?.memberType === MemberType.RESTAURANT
												? "/icons/restaurant.svg"
												: "/icons/user-badge.svg"
										}
										className="order-user-prof-img"
									/>
								</div>
							</div>
							<span className="order-user-name">{authMember?.memberNick}</span>
							<span className="order-user-prof">{authMember?.memberType}</span>
						</Box>
						<Box className="liner"></Box>
						<Box className="order-user-address">
							<div style={{ display: "flex", alignItems: "center" }}>
								<LocationOn />
								<p>
									{authMember?.memberAddress
										? authMember.memberAddress
										: "address does not exist"}
								</p>
							</div>
						</Box>
					</Box>
					<Box className={"order-info-box"} sx={{ mt: "20px" }}>
						<input
							type={"text"}
							name={"cardNumber"}
							placeholder={"Card number : **** 4090 2002 7495"}
							className={"card-input"}
						/>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<input
								type={"text"}
								name={"cardPeriod"}
								placeholder={"07 / 24"}
								className={"card-half-input"}
							/>
							<input
								type={"text"}
								name={"cardCVV"}
								placeholder={"CVV : 010"}
								className={"card-half-input"}
							/>
						</div>
						<input
							type={"text"}
							name={"cardCreator"}
							placeholder={"Kevin Malone"}
							className={"card-input"}
						/>
						<div className={"cards-box"}>
							<img src={"/icons/paypal-card.svg"} />
							<img src={"/icons/master-card.svg"} />
							<img src={"/icons/western-card.svg"} />
							<img src={"/icons/visa-card.svg"} />
						</div>
					</Box>
				</Stack>
			</Container>
		</div>
	);
}
