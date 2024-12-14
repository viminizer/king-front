import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import { retrieveFinishedOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem } from "../../../libs/types/order";
import { useSelector } from "react-redux";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

const finishedOrdersRetriever = createSelector(
	retrieveFinishedOrders,
	(finishedOrders: Order[]) => ({ finishedOrders })
);

export default function FinishedOrders() {
	const { finishedOrders } = useSelector(finishedOrdersRetriever);
	return (
		<TabPanel value={"3"}>
			<Stack>
				{finishedOrders.map((order: Order) => {
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
									<p>Product</p>
									<p>₩{order.orderTotal - order.orderDelivery}</p>
									<img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
									<p>Delivery</p>
									<p>₩{order.orderDelivery}</p>
									<img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} />
									<p>Total</p>
									<p>₩{order.orderTotal}</p>
								</Box>
							</Box>
						</Box>
					);
				})}

				{!finishedOrders ||
					(finishedOrders.length === 0 && (
						<Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
							<img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} />
						</Box>
					))}
			</Stack>
		</TabPanel>
	);
}
