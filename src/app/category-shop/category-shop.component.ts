import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../../models/orders';
import { ProductCategory } from '../../models/product-category';
import { Products } from '../../models/products';
import { SubCategory } from '../../models/sub-category';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
@Component({
  selector: 'app-category-shop',
  standalone: true,
  templateUrl: './category-shop.component.html',
  styleUrl: './category-shop.component.css',
})
export class CategoryShopComponent implements OnInit {
  currentCart: any = [];

  currentItem: any;

  order: Orders = {} as Orders;

  id = 0;

  products: Products[] = [];

  unfilteredProducts: Products[] = [];

  categories: ProductCategory[] = [];

  subCategories: SubCategory[] = [];

  user: any;

  constructor(
    public cartService: CartService,
    private productService: ProductsService,
    private categoryService: SubCategoriesService,
    public actRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrdersService
  ) { }
  ngOnInit(): void {
    console.log('cart', this.cartService.getCurrentCart());

    this.categoryService.getAllList().subscribe((res) => {
      this.subCategories = res.data;
      console.log('categories:', this.subCategories);

      this.productService.getAllList().subscribe((res) => {
        this.unfilteredProducts = res.data.filter(
          (x) => x.sub_category_id == this.id
        );
        this.unfilteredProducts.forEach((product: any) => {
          product.image_url =
            'https://orezon.co.zw/storage/app/public/' + product.image_url;
          const category = this.subCategories.filter(
            (x) => x.id == product.sub_category_id
          );
          console.log('category', category);
          category.forEach((cat) => {
            product.sub_category_name = cat.name;
            console.log('category', product.sub_category_name);
          });
        });
        this.products = this.unfilteredProducts;
        console.log('products:', this.products);
      });
    });

    this.id = this.actRoute.snapshot.params['id'];



    this.cartService.updateTotal.subscribe((resp) => {
      if (resp) {
        this.currentCart = this.cartService.getCurrentCart();
      }
    });
    this.currentCart = this.cartService.getCurrentCart();
  }

  updateCart(item: any) {
    alert('Item added to cart');
    this.cartService.addToCart(item, item.price, 1);

    this.checkIfExist(item);
  }

  getCurrentItemAmount(item): number {
    return this.cartService.getCurrentItemAmount(item);
  }

  checkIfExist(item) {
    const index = this.currentCart?.findIndex((p) => p.id === item.id);
    if (index >= 0) {
      return this.currentCart[index].quantity;
    }
    return 0;
  }
}
