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
  standalone: false,
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
  ) {}
  productsList: any = [
    {
      id: 1,
      name: 'Product 12',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
    },
    {
      id: 4,
      name: 'Product 4',
      price: 400,
    },
    {
      id: 5,
      name: 'Product 5',
      price: 500,
    },
    {
      id: 6,
      name: 'Product 6',
      price: 600,
    },
    {
      id: 7,
      name: 'Product 7',
      price: 700,
    },
    {
      id: 8,
      name: 'Product 8',
      price: 800,
    },
    {
      id: 9,
      name: 'Product 9',
      price: 900,
    },
    {
      id: 10,
      name: 'Product 10',
      price: 1000,
    },
  ];
  ngOnInit(): void {
    console.log('cart', this.cartService.getCurrentCart());

    this.categoryService.getAllList().subscribe((res) => {
      this.subCategories = res.data;
      console.log('categories:', this.subCategories);
    });

    this.id = this.actRoute.snapshot.params['id'];

    this.productService.getAllList().subscribe((res) => {
      this.unfilteredProducts = res.data.filter(
        (x) => x.sub_category_id == this.id
      );
      this.unfilteredProducts.forEach((product: any) => {
        product.image_url = 'https://orezon.co.zw/storage/' + product.image_url;
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
