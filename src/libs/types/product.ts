import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";

export interface ProductInput {
	productStatus?: string;
	productCollection: string;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;
	productImages: string[];
	productViews?: number;
}

export interface Product {
	_id: string;
	productStatus?: string;
	productCollection: string;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize?: string;
	productVolume: number;
	productDesc?: string;
	productImages: string[];
	productViews: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductUpdateInput {
	_id: string;
	productStatus?: ProductStatus;
	productCollection?: ProductCollection;
	productName?: string;
	productPrice?: number;
	productLeftCount?: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;
	productImages?: string[];
	productViews?: number;
}
export interface ProductInquiry {
	order: string;
	page: number;
	limit: number;
	productCollection?: ProductCollection;
	search?: string;
}
