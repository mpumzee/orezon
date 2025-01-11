import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [DecimalPipe , NgxPayPalModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  total: number = 0;
  cartItems = [];
  totalCartItems = 0;

  public payPalConfig ? : IPayPalConfig;
  showSuccess: boolean;
  showCancel: boolean;
  showError: boolean;


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCurrentCart();
    this.totalCartItems = this.cartItems.length;
    this.total = this.cartService.getTotal();
    this.initConfig();
  }




  private initConfig(): void {
      this.payPalConfig = {
          currency: 'USD',
          clientId: 'sb',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'USD',
                      value: this.total.toFixed(2),
                      breakdown: {
                          item_total: {
                              currency_code: 'USD',
                              value: this.total.toFixed(2)
                          }
                      }
                  },
                  items: this.cartItems
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then(details => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
              this.showSuccess = true;
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.showCancel = true;

          },
          onError: err => {
              console.log('OnError', err);
              this.showError = true;
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
              this.resetStatus();
          }
      };
  }
  resetStatus() {
    throw new Error('Method not implemented.');
  }
}
