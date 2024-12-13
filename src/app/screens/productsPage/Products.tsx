import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ProductService from "../../services/ProductService";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import {
	ArrowBack,
	ArrowForward,
	MonetizationOn,
	RemoveRedEye,
} from "@mui/icons-material";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../libs/types/product";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../libs/config";
import { retrieveProducts } from "./selector";
import { createSelector } from "reselect";
import { ProductCollection } from "../../../libs/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/products.css";
import { branches } from "../../../libs/data/branches";

const actionDispatch = (dispatch: Dispatch) => ({
	setProducts: (products: Product[]) => dispatch(setProducts(products)),
});

const productsRetriever = createSelector(retrieveProducts, (products: Product[]) => ({
	products,
}));

interface ProductsProps {
	onAdd: (item: CartItem) => void;
}

export function Products(props: ProductsProps) {
	const { onAdd } = props;
	const { setProducts } = actionDispatch(useDispatch());
	const { products } = useSelector(productsRetriever);
	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 8,
		order: "createdAt",
		productCollection: "" as ProductCollection,
		search: "",
	});
	const [searchText, setSearchText] = useState<string>("");
	const history = useHistory();
	const { setActiveTab } = useGlobals();

	useEffect(() => {
		setActiveTab("products");
		const productService = new ProductService();
		productService
			.getProducts(productSearch)
			.then((products: Product[]) => setProducts(products))
			.catch((err) => console.log(err));
		window.scrollTo(0, 0);
	}, [productSearch]);

	useEffect(() => {
		if (searchText === "") {
			productSearch.search = "";
			setProductSearch({ ...productSearch });
		}
	}, [searchText]);

	/**HANDLERS */
	const searchCollectionHandler = (collection: ProductCollection) => {
		productSearch.page = 1;
		if (productSearch.productCollection === collection) {
			productSearch.productCollection = "" as ProductCollection;
			setProductSearch({ ...productSearch });
		} else {
			productSearch.productCollection = collection;
			setProductSearch({ ...productSearch });
		}
	};

	const searchOrderHandler = (order: string) => {
		productSearch.page = 1;
		productSearch.order = order;
		setProductSearch({ ...productSearch });
	};

	const searchProductHandler = () => {
		productSearch.search = searchText;
		setProductSearch({ ...productSearch });
	};

	const paginationHandler = (e: ChangeEvent<any>, value: number) => {
		productSearch.page = value;
		setProductSearch({ ...productSearch });
	};

	const chosenDishHandler = (id: string) => {
		history.push(`/products/${id}`);
	};

	return (
		<div className="products">
			<Container sx={{ mt: "150px" }}>
				<Stack flexDirection={"column"} alignItems={"center"}>
					<Stack className={"avatar-big-box"}>
						<Stack className={"top-text"}>
							<p>OUR MENU</p>
							<Stack className={"single-search-big-box"}>
								<input
									type={"search"}
									className={"single-search-input"}
									name={"singleResearch"}
									placeholder={"Search here"}
									value={searchText}
									onChange={(event) => {
										setSearchText(event.target.value);
									}}
									onKeyDown={(event) => {
										if (event.key === "Enter") searchProductHandler();
									}}
								/>
								<Button
									className={"single-button-search"}
									endIcon={<SearchIcon />}
									onClick={searchProductHandler}
								>
									Search
								</Button>
							</Stack>
						</Stack>
					</Stack>
					<Stack className="dishes-filter-section">
						<Stack className="dishes-filter-box">
							<Button
								variant="contained"
								className={`order ${
									productSearch.order === "createdAt" ? "active-order-button" : ""
								}`}
								onClick={() => searchOrderHandler("createdAt")}
							>
								New
							</Button>
							<Button
								variant="contained"
								className={`order ${
									productSearch.order === "productPrice" ? "active-order-button" : ""
								}`}
								onClick={() => searchOrderHandler("productPrice")}
							>
								Price
							</Button>
							<Button
								variant="contained"
								className={`order ${
									productSearch.order === "productViews" ? "active-order-button" : ""
								}`}
								onClick={() => searchOrderHandler("productViews")}
							>
								Views
							</Button>
						</Stack>
					</Stack>
					<Stack className="list-category-section">
						<Stack className="product-category">
							<div className="category-main">
								<Button
									variant="contained"
									className={`order ${
										productSearch.productCollection === ProductCollection.OTHER
											? "active-order-button"
											: ""
									}`}
									onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
								>
									Other
								</Button>
								<Button
									variant="contained"
									className={`order ${
										productSearch.productCollection === ProductCollection.DESSERT
											? "active-order-button"
											: ""
									}`}
									onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
								>
									Dessert
								</Button>
								<Button
									variant="contained"
									className={`order ${
										productSearch.productCollection === ProductCollection.DRINK
											? "active-order-button"
											: ""
									}`}
									onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
								>
									Drink
								</Button>
								<Button
									variant="contained"
									className={`order ${
										productSearch.productCollection === ProductCollection.SALAD
											? "active-order-button"
											: ""
									}`}
									onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
								>
									Salad
								</Button>
								<Button
									variant="contained"
									className={`order ${
										productSearch.productCollection === ProductCollection.DISH
											? "active-order-button"
											: ""
									}`}
									onClick={() => searchCollectionHandler(ProductCollection.DISH)}
								>
									Dish
								</Button>
							</div>
						</Stack>
						<Stack className="product-wrapper">
							{products.length !== 0 ? (
								products.map((product: Product) => {
									const imagePath = `${serverApi}/${product.productImages[0]}`;
									const sizeVolume =
										product.productCollection === ProductCollection.DRINK
											? product.productVolume + " L"
											: product.productSize + " SIZE";
									return (
										<Stack
											key={product._id}
											className="product-card"
											onClick={() => chosenDishHandler(product._id)}
										>
											<Stack
												className="product-img"
												sx={{ backgroundImage: `url(${imagePath})` }}
											>
												<div className="product-scale">{sizeVolume}</div>
												<Button
													className="shop-btn"
													onClick={(e) => {
														e.stopPropagation();
														onAdd({
															_id: product._id,
															quantity: 1,
															name: product.productName,
															price: product.productPrice,
															image: product.productImages[0],
														});
													}}
												>
													<img
														src="/icons/shopping-cart.svg"
														style={{ display: "flex" }}
													/>
												</Button>
												<Button className="view-btn" sx={{ right: "36px" }}>
													<Badge badgeContent={product.productViews} color="secondary">
														<RemoveRedEye
															sx={{
																color: product.productViews === 0 ? "gray" : "white",
															}}
														/>
													</Badge>
												</Button>
											</Stack>
											<Box className="product-desc">
												<span className="product-title">{product.productName}</span>
												<div className="product-desc">₩{product.productPrice}</div>
											</Box>
										</Stack>
									);
								})
							) : (
								<Box className="no-data">Producs are not available</Box>
							)}
						</Stack>
					</Stack>
					<Stack className="pagination-section">
						<Pagination
							count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
							page={productSearch.page}
							renderItem={(item) => (
								<PaginationItem
									components={{
										previous: ArrowBack,
										next: ArrowForward,
									}}
									{...item}
									color="primary"
								/>
							)}
							onChange={paginationHandler}
						/>
					</Stack>
				</Stack>
			</Container>
			<div className={"brands-logo"}>
				<Container className={"family-brands"}>
					<Box className={"title"}>King Kebab Branches</Box>
					<Stack className={"branch-list"}>
						{branches.map((branch) => (
							<Container className="card">
								<img src={branch.img} />
								<Box className="info">
									<h1>{branch.name}</h1>
									<p>{branch.address} </p>
									<Button className="branch-button">Explore</Button>
								</Box>
							</Container>
						))}
					</Stack>
				</Container>
			</div>
			<div className="address">
				<Container>
					<Stack className="address-area">
						<Box className="title">Our Address</Box>
						<iframe
							style={{ marginTop: "60px" }}
							src="https://www.google.com/maps/d/u/0/embed?mid=1XK-f2FfchtNWmKA9DGrUzHvnTD8&f=q&source=s_q&hl=pt-BR&geocode&q=Anam-dong%20Seongbuk-Gu%2C%20Seoul%2C%20136-701%20Korea&ie=UTF8&oe=UTF8&msa=0&sll=37.585838%2C127.021353&sspn=0.020749%2C0.028168&ll=37.59253999999999%2C127.02774499999997&spn=0.00777%2C0.013797&z=16&output=embed"
							width="1320"
							height="500"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</Stack>
				</Container>
			</div>
		</div>
	);
}
