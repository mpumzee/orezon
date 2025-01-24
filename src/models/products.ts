import { Pivot } from './pivot';
import { ProductCategory } from './product-category';

export interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  amount: number;
  pivot: Pivot;
  image_url: File;
  sub_category_id: number;
  subcategory: ProductCategory;
  sub_category_name: string;
  user_id: number;
  business_name: string;
  created_at: Date;
  updated_at: Date;
}
