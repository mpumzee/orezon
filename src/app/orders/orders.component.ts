import { Component } from '@angular/core';
import { Orders } from '../../models/orders';
import { OrderProducts } from '../../models/order-products';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: Orders [] = []

  orderProducts: OrderProducts[] = []

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getAllList()
    .subscribe(res => {
      this.orders = res.data;
      console.log('orders:', res.data)
    });
  }

}