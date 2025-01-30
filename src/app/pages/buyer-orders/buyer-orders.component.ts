import { Component } from '@angular/core';
import { Orders } from '../../../models/orders';
import { ProductCategory } from '../../../models/product-category';
import { Seller } from '../../../models/seller';
import { User } from '../../../models/user';
import { BuyerRegistrationService, OrdersService, SellerRegistrationService, SubCategoriesService } from '../../tools/services';
@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrl: './buyer-orders.component.css',
})
export class BuyerOrdersComponent {
  orders: Orders[] = [];

  filteredOrders: Orders[] = [];

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
  ) { }

  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);

      this.sellerService.getAllList().subscribe((res) => {
        this.sellers = res.data;
        console.log('sellers:', res.data);

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
          this.filteredOrders = this.orders
          console.log('orders:', this.orders);
        });
      });
    });

    this.buyerService.getAllList().subscribe((res) => {
      res.data
        .filter((x) => x.user_id == this.user.id)
        .forEach((buyer) => {
          this.buyer_pic =
            'assets/img/user.png';
        });
      console.log('buyer:', res.data);
    });



  }

  viewOrder(item: Orders) {
    console.log('item', item);
    this.viewOrderModal = true;
    this.selectedOrder = item;
  }

  searchOrders(item: any) {
    console.log(this.orders)
    this.filteredOrders = this.orders.filter(
      prod => prod?.id.toString().includes(item)
    );
    // if (this.filteredProducts = []) {
    //   this.showProducts = false
    // }
    console.log(this.filteredOrders)
    //this.filteredProducts = this.products.filter(x => x.)
  }

  hideDialog() {
    this.viewOrderModal = false;
  }
}
