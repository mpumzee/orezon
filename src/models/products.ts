import { ProductCategory } from "./product-category";

export interface Products {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    image_url: File,
    category_id: number,
    category: ProductCategory,
    category_name: string,
    created_at: Date,
    updated_at: Date

}
