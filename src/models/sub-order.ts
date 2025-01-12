import { Status } from '../enums/status';
import { Products } from './products';

export interface SubOrder {
  id: number;
  order_id: number;
  buyer_id: number;
  seller_id: number;
  total_price: number;
  status: Status;
  created_at: Date;
  update_at: Date;
  products: Products[];
}
