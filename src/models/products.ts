import { ProductCategory } from './product-category';

export interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: File;
  sub_category_id: number;
  sub_category: ProductCategory;
  sub_category_name: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
