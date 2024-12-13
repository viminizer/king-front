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
import { T } from "../../../libs/types/common";

const actionDispatch = (dispatch: Dispatch) => ({
	setProducts: (products: Product[]) => dispatch(setProducts(products)),
});
const defaultIframSrc =
	"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d757.901178888223!2d126.99318345669143!3d37.53474312666402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca24c2f390b6f%3A0x395baa4b310e0016!2z7YK57LyA67ClIOydtO2DnOybkOygkCAtIEtpbmcgS2ViYWIgSXRhZXdvbiAtIEhhbGFs!5e0!3m2!1sen!2skr!4v1734115613420!5m2!1sen!2skr";

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
	const [iframeSrc, setIframeSrc] = useState<string>(defaultIframSrc);
	const [addressName, setAddressName] = useState<string>("Itaewon Branch");
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

	const cardClickHandler = (id: string, src: T) => {
		setIframeSrc(src.iframeSrc);
		setAddressName(src.name);
		const section: HTMLElement = document.getElementById(id)!;
		const offset = window.innerHeight / 3;
		const sectionTop = section.getBoundingClientRect().top + window.scrollY;
		const scrollPosition = sectionTop - offset + section.offsetHeight / 2;

		window.scrollTo({
			top: scrollPosition,
			behavior: "smooth",
		});
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
			<div className={"branches"}>
				<Container className={"branches-container"}>
					<Box className={"title"}>Our Branches</Box>
					<Stack className={"branch-list"}>
						{branches.map((branch) => (
							<Box className="card" onClick={() => cardClickHandler("address", branch)}>
								<img src={branch.img} />
								<div className="layer"></div>
								<Box className="info">
									<h1>{branch.name}</h1>
									<p>{branch.address} </p>
									<p>OPEN: {branch.hours} </p>
									<Button
										href={branch.naverLink}
										target="_blank"
										className="branch-button"
									>
										Naver Map
									</Button>
									<Button
										onClick={() => cardClickHandler("address", branch)}
										className="branch-button"
										style={{ background: "#4285F4" }}
									>
										Google Maps
									</Button>
								</Box>
							</Box>
						))}
					</Stack>
				</Container>
			</div>
			<div className="address">
				<Container>
					<Stack className="address-area">
						<Box className="title" id="address">
							{addressName} Address
						</Box>
						<iframe
							style={{ marginTop: "60px", marginBottom: "50px" }}
							src={iframeSrc}
							loading="lazy"
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
