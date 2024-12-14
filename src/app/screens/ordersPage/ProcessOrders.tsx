import React from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import OrderService from "../../services/OrderService";
import { Box, Stack } from "@mui/material";
import { retrieveProcessOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { useSelector } from "react-redux";
import { Product } from "../../../libs/types/product";
import { Messages, serverApi } from "../../../libs/config";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../libs/types/common";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { sweetErrorHandling } from "../../../libs/sweetAlert";

const processOrdersRetriever = createSelector(
	retrieveProcessOrders,
	(processOrders: Order[]) => ({ processOrders })
);

interface ProcessOrdersProps {
	setValue: (input: string) => void;
}
export default function ProcessOrders(props: ProcessOrdersProps) {
	const { processOrders } = useSelector(processOrdersRetriever);
	const { authMember, setOrderBuilder } = useGlobals();
	const { setValue } = props;

	/** HANDLERS */
	const finishOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.FINISH,
			};
			const confirmation = window.confirm("Have you recieved your order?");
			if (confirmation) {
				const order = new OrderService();
				await order.updateOrder(input);
				setValue("3");
				setOrderBuilder(new Date());
			}
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err);
		}
	};
	return (
		<TabPanel value={"2"}>
			<Stack>
				{processOrders.map((order: Order) => {
					return (
						<Box key={order._id} className={"order-main-box"}>
							<Box className={"order-box-scroll"}>
								{order?.orderItems?.map((orderItem: OrderItem) => {
									const product: Product = order?.productData.filter(
										(product: Product) => orderItem.productId === product._id
									)[0];

									const imagePath = `${serverApi}/${product.productImages[0]}`;
									return (
										<Box key={orderItem._id} className={"orders-name-price"}>
											<img src={imagePath} className={"order-dish-img"} />
											<p className={"title-dish"}>{product.productName}</p>
											<Box className={"price-box"}>
												<p>₩{orderItem.itemPrice}</p>
												<img src={"/icons/close.svg"} />
												<p>{orderItem.itemQuantity}</p>
												<img src={"/icons/pause.svg"} />
												<p style={{ marginLeft: "15px" }}>
													₩{orderItem.itemPrice * orderItem.itemQuantity}
												</p>
											</Box>
										</Box>
									);
								})}
							</Box>

							<Box className={"total-price-box"}>
								<Box className={"box-total"}>
									<p>₩{order.orderTotal - order.orderDelivery}</p>
									<img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
									<p>Delivery</p>
									<p>₩{order.orderDelivery}</p>
									<img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} />
									<p>₩{order.orderTotal}</p>
								</Box>
								<p className="data-compl">{moment().format("YY-MM-DD HH:mm")}</p>
								<Button
									value={order._id}
									variant="contained"
									sx={{ bgcolor: "#56b74d", color: "white" }}
									onClick={finishOrderHandler}
								>
									Verify to Fullfill
								</Button>
							</Box>
						</Box>
					);
				})}

				{!processOrders ||
					(processOrders.length === 0 && (
						<Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
							<img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} />
						</Box>
					))}
			</Stack>
		</TabPanel>
	);
}
