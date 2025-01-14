import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../enums/roles';
import { Orders } from '../../models/orders';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css',
})
export class BuyerDashboardComponent {
  profile = false;
  orderstab = false;
  payments = false;

  role: any;

  orders: Orders[] = [];

  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.profile = true;

    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    if (sessionStorage.length == 0 || this.role != Roles.BUYER) {
      console.log('what');
      this.router.navigate(['/login']);
    }
  }

  showPayment() {
    this.payments = true;
    this.orderstab = false;
    this.profile = false;
  }

  showOrders() {
    this.orderstab = true;
    this.payments = false;
    this.profile = false;
  }

  showProfile() {
    this.profile = true;
    this.orderstab = false;
    this.payments = false;
  }
}
