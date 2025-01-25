import { Component } from '@angular/core';
import { Buyer } from '../../../models/buyer';
import { ProductCategory } from '../../../models/product-category';
import { Seller } from '../../../models/seller';
import { SubOrder } from '../../../models/sub-order';
import { User } from '../../../models/user';
import { BuyerRegistrationService, OrdersService, SellerRegistrationService, SubCategoriesService } from '../../tools/services';
@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css',
})
export class SellerOrdersComponent {
  orders: SubOrder[] = [];

  user: User = {} as User;

  sellers: Seller[] = [];

  buyers: Buyer[] = [];

  buyer_pic: any;

  selectedOrder: SubOrder = {} as SubOrder;

  viewOrderModal = false;

  seller: Seller = {} as Seller;

  categories: ProductCategory[] = [];

  constructor(
    private orderService: OrdersService,
    private sellerService: SellerRegistrationService,
    private buyerService: BuyerRegistrationService,
    private categoryService: SubCategoriesService
  ) { }

  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);

      this.orderService.getSellerOrders().subscribe((res) => {
        this.orders = res.data;
        this.orders.forEach((order) => {
          order.total_quantity = 0;
          this.buyers
            .filter((x) => x.user_id == order.buyer_id)
            .forEach((buyer) => {
              console.log('entered', buyer);
              order.buyer_pic =
                'assets/img/user.png';
              order.buyer_name = buyer.user.name;
              order.buyer_email = buyer.user.email;
            });
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
              .filter((x) => x.user_id == order.seller_id)
              .forEach((seller) => {
                prod.business_name = seller.business_name;
              });
            order.total_quantity += prod.pivot.quantity;
          });
        });
        console.log('orders:', this.orders);
      });
    });

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;
      console.log('buyer:', res.data);
    });

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;
      console.log('sellers:', res.data);
    });


  }

  viewOrder(item: SubOrder) {
    console.log('item', item);
    this.viewOrderModal = true;
    this.selectedOrder = item;
  }

  hideDialog() {
    this.viewOrderModal = false;
  }
}
