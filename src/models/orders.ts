import { Status } from '../enums/status';
import { Products } from './products';
import { SubOrder } from './sub-order';

export interface Orders {
  id: number;
  user_id: number;
  user_name: string;
  total_price: number;
  status: Status;
  products: Products[];
  sub_orders: SubOrder;
  created_at: Date;
  updated_at: Date;
  total_quantity: number;
}
