import axios from "axios";
import { serverApi } from "../../libs/config";
import {
	Order,
	OrderInquiry,
	OrderItemInput,
	OrderUpdateInput,
} from "../../libs/types/order";
import { CartItem } from "../../libs/types/search";

class OrderService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}

	public async createOrder(input: CartItem[]): Promise<Order> {
		try {
			const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
				return {
					itemQuantity: cartItem.quantity,
					itemPrice: cartItem.price,
					productId: cartItem._id,
				};
			});
			const url = `${this.path}/order/create`;

			const result = await axios.post(url, orderItems, { withCredentials: true });
			console.log("createOrder", result);

			return result.data;
		} catch (err) {
			console.log("ERROR: createOrder:", err);
			throw err;
		}
	}

	public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
		try {
			// axios.defaults.withCredentials = true;
			const url = `${this.path}/order/all`;
			const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
			const result = await axios.get(url + query, { withCredentials: true });
			console.log("getMyOrders", result.data);
			return result.data;
		} catch (err) {
			console.log("ERROR: getMyOrders:", err);
			throw err;
		}
	}

	public async updateOrder(input: OrderUpdateInput): Promise<Order> {
		try {
			const url = `${serverApi}/order/update`;
			const result = await axios.post(url, input, { withCredentials: true });
			return result.data;
		} catch (err) {
			console.log("ERROR: updateOrder:", err);
			throw err;
		}
	}
}

export default OrderService;
