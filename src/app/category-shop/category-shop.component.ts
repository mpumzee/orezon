import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { Products } from '../../models/products';
import { CartService } from '../../services/cart.service';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-category-shop',
  standalone: false,
  templateUrl: './category-shop.component.html',
  styleUrl: './category-shop.component.css',
})
export class CategoryShopComponent implements OnInit {
  currentCart: any = [];

  currentItem: any;

  id = 0;

  products: Products[] = [];

  unfilteredProducts: Products[] = [];

  categories: ProductCategory[] = [];

  constructor(
    public cartService: CartService,
    private productService: ProductsService,
    private categoryService: ProductCategoryService,
    public actRoute: ActivatedRoute
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
    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);
    });

    this.id = this.actRoute.snapshot.params['id'];

    this.productService.getAllList().subscribe((res) => {
      this.unfilteredProducts = res.data.filter(
        (x) => x.sub_category_id == this.id
      );
      this.unfilteredProducts.forEach((product: any) => {
        product.image_url =
          'http://127.0.0.1:8000/storage/' + product.image_url;
        const category = this.categories.filter(
          (x) => x.id == product.sub_category_id
        );
        category.forEach((cat) => {
          product.sub_category_name = cat.name;
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
