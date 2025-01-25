import { Component } from '@angular/core';
import { Buyer } from '../../../models/buyer';
import { Payments } from '../../../models/payments';
import { Seller } from '../../../models/seller';
import { User } from '../../../models/user';
import { BuyerRegistrationService, SellerRegistrationService, PaymentService } from '../../tools/services';

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
      this.payments.forEach((payment) => {
        this.buyers
          .filter((x) => x.user_id == payment.buyer_id)
          .forEach((buyer) => {
            console.log('entered', buyer);
            payment.buyer_name = buyer.user.name;
            payment.buyer_email = buyer.user.email;
          });

        this.sellers
          .filter((x) => x.user_id == payment.seller_id)
          .forEach((buyer) => {
            console.log('entered', buyer);
            payment.buyer_name = buyer.user.name;
          });
      });
      console.log('payments:', this.payments);
    });
  }

}
