import { Component } from '@angular/core';
import { Buyer } from '../../../models/buyer';
import { Payments } from '../../../models/payments';
import { Seller } from '../../../models/seller';
import { User } from '../../../models/user';
import { BuyerRegistrationService, PaymentService, SellerRegistrationService } from '../../tools/services';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrl: './admin-payment.component.css'
})
export class AdminPaymentComponent {

  payments: Payments[] = []

  user: User = {} as User;

  buyers: Buyer[] = [];

  sellers: Seller[] = [];

  buyer_pic: any;

  constructor(private buyerService: BuyerRegistrationService, private sellerService: SellerRegistrationService, private paymentService: PaymentService) { }


  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;
      console.log('buyers:', res.data);
    });
    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;
      console.log('sellers:', res.data);
    });

    this.paymentService.getAllList().subscribe((res) => {
      this.payments = res.data;
      console.log('payments:', this.payments);
      this.payments.forEach((payment) => {

        if (payment.buyer_id == null) {
          this.sellers
            .filter((x) => x.user_id == payment.subscription.user_package.user_id)
            .forEach((seller) => {
              payment.buyer_name = seller.user.name;
              payment.buyer_email = seller.user.name
            });
        } else {
          payment.buyer_name = payment.buyer.name
          payment.buyer_email = payment.buyer.email
        }
      });
      console.log('payments:', this.payments);
    });
  }

}
