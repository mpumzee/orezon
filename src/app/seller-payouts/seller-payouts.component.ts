import { Component } from '@angular/core';
import { Buyer } from '../../models/buyer';
import { Payments } from '../../models/payments';
import { SubOrder } from '../../models/sub-order';
import { User } from '../../models/user';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';
import { OrdersService } from '../../services/orders.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-seller-payouts',
  templateUrl: './seller-payouts.component.html',
  styleUrl: './seller-payouts.component.css'
})
export class SellerPayoutsComponent {
  orders: SubOrder[] = [];

  users: User[] = []

  payments: Payments[] = []

  user: User = {} as User;

  buyers: Buyer[] = [];

  buyer_pic: any;

  viewPaymentModal = false;

  constructor(private buyerService: BuyerRegistrationService, private orderService: OrdersService, private paymentService: PaymentService) { }


  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;
      console.log('buyer:', res.data);
    });

    this.orderService.getAllList().subscribe((res) => {
      this.orders = res.data;
      console.log('orders:', res.data);
    });

    this.paymentService.getSellerPayments().subscribe((res) => {
      this.payments = res.data;
      this.payments.forEach((payment) => {
        this.buyers
          .filter((x) => x.user_id == payment.buyer_id)
          .forEach((buyer) => {
            console.log('entered', buyer);
            payment.buyer_pic =
              'https://orezon.co.zw/storage/app/public/' + buyer.profile_pic;
            payment.buyer_name = buyer.user.name;
            payment.buyer_email = buyer.user.email;
          });
        this.orders.filter(x => x.order_id == payment.order_id).forEach(order => {
          this.users.filter(x => x.id == order.seller_id).forEach(user => {
            payment.seller_name = user.name
          })
        })
      });
      console.log('orders:', this.payments);
    });
  }

  viewPayment(item: any) {
    this.viewPaymentModal = true
  }

}
