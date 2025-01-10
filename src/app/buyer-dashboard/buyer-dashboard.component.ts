import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../../models/orders';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css',
})
export class BuyerDashboardComponent {
  dashboard = false;
  profile = false;
  orderstab = false;
  payments = false;

  role: any;

  orders: Orders[] = [];

  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.profile = true;

    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    // if (sessionStorage.length == 0 || this.role != Roles.BUYER) {
    //   console.log('what');
    //   this.router.navigate(['/login']);
    // }
  }

  showPayment() {
    this.payments = true;
  }

  showOrders() {
    this.orderstab = true;
  }

  showProfile() {
    this.profile = true;
  }

  showDashboard() {
    this.dashboard = true;
  }
}
