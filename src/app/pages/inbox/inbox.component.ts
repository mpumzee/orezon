import { Component, OnInit } from '@angular/core';
import { Buyer } from '../../../models/buyer';
import { Payments } from '../../../models/payments';
import { Seller } from '../../../models/seller';
import { SubOrder } from '../../../models/sub-order';
import { User } from '../../../models/user';
import { BuyerRegistrationService, ContactUsService, OrdersService, PaymentService, PayoutsService, SellerRegistrationService } from '../../tools/services';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})

export class InboxComponent implements OnInit {
  orders: SubOrder[] = [];

  sellers: Seller[] = [];

  payments: Payments[] = [];

  filteredPayments: Payments[] = [];

  user: User = {} as User;

  buyers: Buyer[] = [];

  messages: any;

  unfilteredmessages: any;

  buyer_pic: any;

  viewPaymentModal = false;

  selectedMessage: any;

  constructor(
    private sellerService: SellerRegistrationService,
    private payoutService: PayoutsService,
    private buyerService: BuyerRegistrationService,
    private orderService: OrdersService,
    private paymentService: PaymentService,
    private messageService: ContactUsService
  ) { }

  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.messageService.getMessages().subscribe((res) => {
      this.messages = res.data;
      console.log('messages:', res.data);

      this.sellerService.getAllList().subscribe((res) => {
        this.sellers = res.data;
        console.log('sellers:', res.data);
        this.messages.forEach((message) => {
          this.sellers.filter(x => x.id == message.seller_id).forEach(seller => {
            message.seller_name = seller.user.name
            message.seller_email = seller.user.email
            message.seller_pic = 'assets/img/user.png';
          });
        });
      });
      this.unfilteredmessages = this.messages
      console.log('messages final:', this.messages);
    });
  }

  viewPayment(item: any) {
    this.viewPaymentModal = true;
    this.selectedMessage = item;
  }

  searchPayments(item: any) {
    console.log(this.messages);
    this.messages = this.unfilteredmessages.filter((prod) =>
      prod?.seller_name.toLowerCase().includes(item.toLowerCase())
    );
    // if (this.filteredProducts = []) {
    //   this.showProducts = false
    // }
    console.log(this.messages);
    //this.filteredProducts = this.products.filter(x => x.)
  }

  hideDialog() {
    this.viewPaymentModal = false;
  }


  getPayOuts() {
    this.payoutService.getAllSellerBalance().subscribe((res) => {
      this.payments = res.data;
      console.log('seller balance:', res.data);
    });
  }



}
