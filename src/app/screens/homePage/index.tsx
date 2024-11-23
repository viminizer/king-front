import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { NewDishes } from "./NewDishes";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../libs/types/product";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ProductCollection } from "../../../libs/enums/product.enum";
import { Member } from "../../../libs/types/member";
import "../../../css/home.css";

const actionDispatch = (dispatch: Dispatch) => ({
	setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
	setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
	setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
	const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());

	useEffect(() => {
		const product = new ProductService();
		const member = new MemberService();
		product
			.getProducts({
				page: 1,
				limit: 4,
				order: "productViews",
				productCollection: ProductCollection.DISH,
			})
			.then((data: Product[]) => {
				setPopularDishes(data);
			})
			.catch((err) => console.log(err));

		product
			.getProducts({
				page: 1,
				limit: 4,
				order: "createdAt",
			})
			.then((data: Product[]) => {
				setNewDishes(data);
			})
			.catch((err) => console.log(err));

		member
			.getTopUsers()
			.then((data: Member[]) => setTopUsers(data))
			.catch((err) => console.log(err));

		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="homepage">
			{/* <Statistics /> */}
			<PopularDishes />
			<NewDishes />
			<Advertisement />
			<ActiveUsers />
			<Events />
		</div>
	);
}
