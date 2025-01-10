import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../enums/roles';
import { Orders } from '../../models/orders';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  dashboard = false;
  profile = false;
  orderstab = false;
  payments = false;
  users = false;
  categories = false;

  role: any;

  orders: Orders[] = [];

  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    if (sessionStorage.length == 0 || this.role != Roles.ADMIN) {
      this.router.navigate(['/login']);
    }

    this.dashboard = true;
  }

  showPayment() {
    this.payments = true;
  }

  showOrders() {
    this.orderstab = true;
  }

  showUsers() {
    this.users = true;
  }

  showProfile() {
    this.profile = true;
  }

  showDashboard() {
    this.dashboard = true;
  }

  showCategories() {
    this.categories = true;
  }
}
