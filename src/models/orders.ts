import { Status } from "../enums/status";

export interface Orders {
    id: number,
    user_id: number,
    seller_id: number,
    total_price: number,
    status: Status,
    created_at: Date,
    updated_at: Date
}
