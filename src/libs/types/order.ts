import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItem {
	_id: string;
	itemQuantity: number;
	itemPrice: number;
	orderId: string;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemInput {
	itemQuantity: number;
	itemPrice: number;
	orderId?: string;
	productId: string;
}

export interface Order {
	_id: string;
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation */
	orderItems: OrderItem[];
	productData: Product[];
}

export interface OrderInput {
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: string;
}

export interface OrderInquiry {
	page: number;
	limit: number;
	orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
	orderId: string;
	orderStatus: OrderStatus;
}
