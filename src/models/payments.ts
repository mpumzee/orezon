import { PaymentStatus } from "../enums/payment";
import { SubOrder } from "./sub-order";

export interface Payments {
    id: number;
    order_id: number;
    order: SubOrder
    seller_name: string
    buyer_id: number;
    buyer_name: string;
    buyer_pic: any;
    buyer_email: string;
    amount: number;
    payment_method: string;
    transaction_id: string;
    status: PaymentStatus;
    created_at: Date;
    update_at: Date;
}