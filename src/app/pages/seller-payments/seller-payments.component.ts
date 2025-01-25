import { Component } from '@angular/core';
import { Buyer } from '../../../models/buyer';
import { Payments } from '../../../models/payments';
import { User } from '../../../models/user';
import { BuyerRegistrationService, PaymentService } from '../../tools/services';
@Component({
  selector: 'app-seller-payments',
  templateUrl: './seller-payments.component.html',
  styleUrl: './seller-payments.component.css'
})
export class SellerPaymentsComponent {

  payments: Payments[] = []

  user: User = {} as User;

  buyers: Buyer[] = [];

  buyer_pic: any;

  constructor(private buyerService: BuyerRegistrationService, private paymentService: PaymentService) { }


  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;
      console.log('buyer:', res.data);
    });

    this.paymentService.getSellerPayments().subscribe((res) => {
      this.payments = res.data;
      this.payments.forEach((payment) => {
        this.buyers
          .filter((x) => x.user_id == payment.buyer_id)
          .forEach((buyer) => {
            console.log('entered', buyer);
            payment.buyer_pic =
              'assets/img/user.png';
            payment.buyer_name = buyer.user.name;
            payment.buyer_email = buyer.user.email;
          });
      });
      console.log('orders:', this.payments);
    });
  }

}
