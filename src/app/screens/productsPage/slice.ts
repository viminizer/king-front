import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../libs/types/screen";

const initialState: ProductsPageState = {
	restaurant: null,
	chosenProduct: null,
	products: [],
};

const productsPageSlice = createSlice({
	name: "productsPage",
	initialState,
	reducers: {
		setRestaurant: (state, action) => {
			state.restaurant = action.payload;
		},
		setChosenProduct: (state, action) => {
			state.chosenProduct = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { setRestaurant, setChosenProduct, setProducts } = productsPageSlice.actions;

export default productsPageSlice.reducer;
