import { Status } from '../enums/status';
import { Products } from './products';

export interface SubOrder {
  id: number;
  order_id: number;
  buyer_id: number;
  buyer_name: string;
  buyer_pic: any;
  buyer_email: string;
  total_quantity: number;
  seller_id: number;
  total_price: number;
  status: Status;
  created_at: Date;
  update_at: Date;
  products: Products[];
}
