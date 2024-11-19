import React from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import OrderService from "../../services/OrderService";
import { Box, Stack } from "@mui/material";
import { retrievePausedOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { useSelector } from "react-redux";
import { Product } from "../../../libs/types/product";
import { Messages, serverApi } from "../../../libs/config";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../libs/types/common";

const pausedOrdersRetriever = createSelector(
	retrievePausedOrders,
	(pausedOrders: Order[]) => ({ pausedOrders })
);

interface PausedOrderProps {
	setValue: (input: string) => void;
}
export default function PausedOrders(props: PausedOrderProps) {
	const { pausedOrders } = useSelector(pausedOrdersRetriever);
	const { authMember, setOrderBuilder } = useGlobals();
	const { setValue } = props;

	/**HANDLERS */

	const deleteOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2);

			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.DELETE,
			};
			const confirmation = window.confirm("Do you want to delete order?");
			if (confirmation) {
				const order = new OrderService();
				await order.updateOrder(input);
				setOrderBuilder(new Date());
			}
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err);
		}
	};
	const processOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			// PAYMENT PROCESS

			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.PROCESS,
			};
			const confirmation = window.confirm("Do you want to proceed with payment?");
			if (confirmation) {
				const order = new OrderService();
				await order.updateOrder(input);
				// => process orders
				setValue("2");
				setOrderBuilder(new Date());
			}
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err);
		}
	};
	return (
		<TabPanel value={"1"}>
			<Stack>
				{pausedOrders?.map((order: Order) => {
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
												<p>${orderItem.itemPrice}</p>
												<img src={"/icons/close.svg"} />
												<p>{orderItem.itemQuantity}</p>
												<img src={"/icons/pause.svg"} />
												<p style={{ marginLeft: "15px" }}>
													${orderItem.itemPrice * orderItem.itemQuantity}
												</p>
											</Box>
										</Box>
									);
								})}
							</Box>

							<Box className={"total-price-box"}>
								<Box className={"box-total"}>
									<p>Product price</p>
									<p>${order.orderTotal - order.orderDelivery}</p>
									<img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
									<p>Delivery cost</p>
									<p>${order.orderDelivery}</p>
									<img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} />
									<p>Total</p>
									<p>${order.orderTotal}</p>
								</Box>
								<Button
									value={order._id}
									variant="contained"
									color="secondary"
									className={"cancel-button"}
									onClick={deleteOrderHandler}
								>
									Cancel
								</Button>
								<Button
									value={order._id}
									variant="contained"
									className={"pay-button"}
									onClick={processOrderHandler}
								>
									Payment
								</Button>
							</Box>
						</Box>
					);
				})}

				{!pausedOrders ||
					(pausedOrders.length === 0 && (
						<Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
							<img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} />
						</Box>
					))}
			</Stack>
		</TabPanel>
	);
}
