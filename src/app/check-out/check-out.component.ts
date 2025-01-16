import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { PaypalService } from '../../services';
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
    items: this.cartItems,
    price: this.total,
    currency: 'USD'
  };


  constructor(private cartService: CartService, private paypalService: PaypalService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCurrentCart();
    this.totalCartItems = this.cartItems.length;
    this.total = this.cartService.getTotal();

    this.initConfig();
  }




   saveOrder(order:any){
     this.paypalService.postOrder(order).subscribe(resp =>{
      alert('Order Prossed Successfulyy')
     })
   }




  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'AS-HUIcnym-ONjaikvwMor0OzN-bxRt-muXbonxmERNaeU9_DLl1MCz2LsnmKfSWGTvZ-NLvehwaJvxJ',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.total.toFixed(2),

          },

        }]
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        })

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.saveOrder(data)
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

      },
    };
  }
  resetStatus() {
    throw new Error('Method not implemented.');
  }



  toPayPalOrder = (product) => {
    const unitAmountValue = parseFloat(product.price); // Parse price to a number
    const quantity = parseInt(product.quantity, 10);
    const calculatedAmount = unitAmountValue * quantity;

    if (isNaN(unitAmountValue) || isNaN(quantity) || isNaN(calculatedAmount)) {
      console.error("Invalid product data. price and quantity must be valid numbers", product);
      return null; // or throw an error
    }

    return {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'default',
          items: [
            {
              name: product.name,
              description: product.description,
              unit_amount: {
                currency_code: 'USD',
                value: unitAmountValue.toString()
              },
              quantity: quantity,
              category: 'PHYSICAL_GOODS'
            }
          ],
          amount: {
            currency_code: 'USD',
            value: calculatedAmount.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: calculatedAmount.toString()
              }
            }
          }
        }
      ]
    };
  };

  finday() {
    return this.cartItems.map(this.toPayPalOrder).filter(order => order !== null);
  }
}

