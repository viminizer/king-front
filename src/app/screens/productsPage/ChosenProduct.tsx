import React, { useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../libs/types/product";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { Member } from "../../../libs/types/member";
import { useParams } from "react-router-dom";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { serverApi } from "../../../libs/config";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ReusableButton from "../../components/other/ResusableButton";

const actionDispatch = (dispatch: Dispatch) => ({
	setChosenProduct: (product: Product) => dispatch(setChosenProduct(product)),
	setRestaurant: (restaurant: Member) => dispatch(setRestaurant(restaurant)),
});

const chosenProductRetriever = createSelector(
	retrieveChosenProduct,
	(chosenProduct: Product | null) => ({
		chosenProduct,
	})
);
const restaurantRetriever = createSelector(
	retrieveRestaurant,
	(restaurant: Member | null) => ({
		restaurant,
	})
);

interface ChosenProductProps {
	onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
	const { onAdd } = props;
	const { setChosenProduct, setRestaurant } = actionDispatch(useDispatch());
	const { chosenProduct } = useSelector(chosenProductRetriever);
	const { restaurant } = useSelector(restaurantRetriever);
	const { productId } = useParams<{ productId: string }>();
	const { setActiveTab } = useGlobals();

	useEffect(() => {
		setActiveTab("products");
		const product = new ProductService();
		const restaurant = new MemberService();
		product
			.getProduct(productId)
			.then((data: Product) => {
				setChosenProduct(data);
			})
			.catch((err) => {
				console.log(err);
			});

		restaurant
			.getRestaurant()
			.then((data: Member) => {
				setRestaurant(data);
			})
			.catch((err) => console.log(err));
		window.scrollTo(0, 0);
	}, []);
	if (!chosenProduct) return null;
	return (
		<div className={"chosen-product"}>
			<Box className={"title"}>Product Details</Box>
			<Container className={"product-container"}>
				<Stack className={"chosen-product-slider"}>
					<Swiper
						loop={true}
						spaceBetween={10}
						navigation={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="swiper-area"
					>
						{chosenProduct?.productImages.map((ele: string, index: number) => {
							const imagePath = `${serverApi}/${ele}`;
							return (
								<SwiperSlide key={index}>
									<img className="slider-image" src={imagePath} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Stack>
				<Stack className={"chosen-product-info"}>
					<Box className={"info-box"}>
						<strong className={"product-name"}>{chosenProduct?.productName}</strong>
						<span className={"resto-name"}>{restaurant?.memberNick}</span>
						<span className={"resto-name"}>{restaurant?.memberPhone}</span>
						<Box className={"rating-box"}>
							<Rating name="half-rating" defaultValue={4.5} precision={0.5} />
							<div className={"evaluation-box"}>
								<div className={"product-view"}>
									<RemoveRedEyeIcon sx={{ mr: "10px" }} />
									<span>{chosenProduct.productViews}</span>
								</div>
							</div>
						</Box>
						<p className={"product-desc"}>
							{chosenProduct?.productDesc
								? chosenProduct?.productDesc
								: "No description for this product"}
						</p>
						<div className={"product-price"}>
							<span>Price:</span>
							<span>₩{chosenProduct.productPrice}</span>
						</div>
						<div className={"button-box"}>
							<ReusableButton
								width={400}
								height={45}
								handleClick={() =>
									onAdd({
										_id: chosenProduct._id,
										name: chosenProduct.productName,
										quantity: 1,
										price: chosenProduct.productPrice,
										image: chosenProduct.productImages[0],
									})
								}
							>
								Add To Basket
							</ReusableButton>
						</div>
					</Box>
				</Stack>
			</Container>
		</div>
	);
}
