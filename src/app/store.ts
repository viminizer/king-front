import reduxLogger from "redux-logger";
import HomePageReducer from "./screens/homePage/slice";
import ProductsPageReducer from "./screens/productsPage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
export const store = configureStore({
	// @ts-ignore
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
	reducer: {
		homePage: HomePageReducer,
		productsPage: ProductsPageReducer,
		ordersPage: OrdersPageReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
