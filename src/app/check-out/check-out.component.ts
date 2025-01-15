import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { environment } from '../../environments/environment.development';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [DecimalPipe, NgxPayPalModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  total: number = 0;
  cartItems = [];
  totalCartItems = 0;

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;
  showCancel: boolean;
  showError: boolean;

  orderData = {
    products: this.cartItems,
    price: this.total ,
    currency:'USD'
  };
  accessToken:any = null


  constructor(private cartService: CartService ,) { }

  ngOnInit() {
    this.accessToken = sessionStorage.getItem('token');
    console.log(this.accessToken,'access token')
    this.cartItems = this.cartService.getCurrentCart();
    console.log(this.cartService.getCurrentCart())

    this.totalCartItems = this.cartItems.length;

    this.orderData = {
      products: this.cartItems,
      price: this.total ,
      currency:'USD'
    };
    this.total = this.cartService.getTotal();
    this.initConfig();


  }



  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'AS-HUIcnym-ONjaikvwMor0OzN-bxRt-muXbonxmERNaeU9_DLl1MCz2LsnmKfSWGTvZ-NLvehwaJvxJ',
      createOrderOnServer: (data) => fetch(`${environment.url}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(this.orderData)
      })
        .then((res) => res.json())
        .then((order) => order.orderID),
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        })

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      //TODO:  make an api call to the backend  alerting that the user has cancel the order
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        //TODO: there was an error   that happenend and we couldnt complete  , maybe can send  the error
        //TODO: show an alert to the user  that  the transcation
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      },
    };
  }
  resetStatus() {
    throw new Error('Method not implemented.');
  }
}
