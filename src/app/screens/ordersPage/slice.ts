import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../libs/types/screen";

const initialState: OrdersPageState = {
	processOrders: [],
	pausedOrders: [],
	finishedOrders: [],
};

const ordersPageSlice = createSlice({
	name: "ordersPage",
	initialState,
	reducers: {
		setProcessOrders: (state, action) => {
			state.processOrders = action.payload;
		},
		setPausedOrders: (state, action) => {
			state.pausedOrders = action.payload;
		},
		setFinishedOrders: (state, action) => {
			state.finishedOrders = action.payload;
		},
	},
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
	ordersPageSlice.actions;
export default ordersPageSlice.reducer;
