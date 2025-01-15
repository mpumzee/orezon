import { Component } from '@angular/core';
import { Orders } from '../../models/orders';
import { ProductCategory } from '../../models/product-category';
import { Seller } from '../../models/seller';
import { User } from '../../models/user';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';
import { OrdersService } from '../../services/orders.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrl: './buyer-orders.component.css',
})
export class BuyerOrdersComponent {
  orders: Orders[] = [];

  user: User = {} as User;

  sellers: Seller[] = [];

  buyer_pic: any;

  selectedOrder: Orders = {} as Orders;

  viewOrderModal = false;

  seller: Seller = {} as Seller;

  categories: ProductCategory[] = [];

  constructor(
    private orderService: OrdersService,
    private sellerService: SellerRegistrationService,
    private buyerService: BuyerRegistrationService,
    private categoryService: SubCategoriesService
  ) {}

  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);
    });

    this.buyerService.getAllList().subscribe((res) => {
      res.data
        .filter((x) => x.user_id == this.user.id)
        .forEach((buyer) => {
          this.buyer_pic =
            'https://orezon.co.zw/storage/app/public/' + buyer.profile_pic;
        });
      console.log('buyer:', res.data);
    });

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;
      console.log('sellers:', res.data);
    });

    this.orderService.getBuyerOrders().subscribe((res) => {
      this.orders = res.data;
      this.orders.forEach((order) => {
        order.total_quantity = 0;
        order.products.forEach((prod: any) => {
          prod.image_url =
            'https://orezon.co.zw/storage/app/public/' + prod.image_url;
          const category = this.categories.filter(
            (x) => x.id == prod.sub_category_id
          );
          category.forEach((cat) => {
            prod.sub_category_name = cat.name;
          });
          this.sellers
            .filter((x) => x.user.id == prod.user_id)
            .forEach((seller) => {
              prod.business_name = seller.business_name;
            });
          order.total_quantity += prod.pivot.quantity;
        });
      });
      console.log('orders:', res.data);
    });
  }

  viewOrder(item: Orders) {
    console.log('item', item);
    this.viewOrderModal = true;
    this.selectedOrder = item;
  }

  hideDialog() {
    this.viewOrderModal = false;
  }
}
