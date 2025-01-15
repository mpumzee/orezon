import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../enums/status';
import { Orders } from '../../models/orders';
import { ProductCategory } from '../../models/product-category';
import { Products } from '../../models/products';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  currentCart: any = [];

  currentItem: any;

  order: Orders = {} as Orders;

  id = 0;

  cartItems: Products[] = [];

  products: Products[] = [];

  unfilteredProducts: Products[] = [];

  categories: ProductCategory[] = [];

  constructor(
    private router:Router,
    public cartService: CartService,
    private productService: ProductsService,
    private categoryService: ProductCategoryService,
    public actRoute: ActivatedRoute,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    console.log('cart', this.cartService.getCurrentCart());

    this.cartItems = this.cartService.getCurrentCart();

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
    this.checkIfExistPrice(item);
    this.getTotal();
    console.log('cart', this.cartService.getCurrentCart());
  }

  checkOut() {
    this.order.total_price = this.cartService.getTotal();
    this.order.status = Status.PEN;
    this.order.user_id = JSON.parse(
      sessionStorage.getItem('loggedUser') || '{}'
    );
    this.order.products = this.cartService.getCurrentCart();

    console.log('yes:', this.order);

    this.orderService.order(this.order).subscribe(
      (res) => {
        console.log(res);
        if (res.status == 'created') {
          console.log(res);
          alert(res.message);
          this.ngOnInit();
        } else {
          console.error(Error);
        }
      },
      (error) => {
        console.error(error.error.message);
        alert(error.error.message);
      }
    );
  }

  checkIfExist(item) {
    const index = this.currentCart?.findIndex((p) => p.id === item.id);
    if (index >= 0) {
      return this.currentCart[index].quantity;
    }
    return 0;
  }

  checkIfExistPrice(item) {
    const index = this.currentCart?.findIndex((p) => p.id === item.id);
    if (index >= 0) {
      return this.currentCart[index].amount;
    }
    return 0;
  }

  getTotal() {
    return this.cartService.getTotal();
  }


  checkout(){
    this.router.navigate(['/checkout'])

  }
}
