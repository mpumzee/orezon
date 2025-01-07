import { Status } from "../enums/status";
import { OrderProducts } from "./order-products";

export interface Orders {
    id: number,
    user_id: number,
    seller_id: number,
    total_price: number,
    status: Status,
    products: OrderProducts,
    created_at: Date,
    updated_at: Date
}
