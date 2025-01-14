import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../enums/roles';
import { Orders } from '../../models/orders';
import { Package } from '../../models/package';
import { OrdersService } from '../../services/orders.service';
import { PackagesService } from '../../services/packages.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  dashboard = false;
  profile = false;
  orderstab = false;
  showPayments = false;
  showPackages = false;
  users = false;

  packages: Package[] = [];

  showProductCategories = false;

  role: any;

  orders: Orders[] = [];

  constructor(
    private packageService: PackagesService,
    private orderService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    if (sessionStorage.length == 0 || this.role != Roles.ADMIN) {
      this.router.navigate(['/login']);
    }

    this.packageService.getAllList().subscribe((res) => {
      this.packages = res.data;
      console.log('packages:', res.data);
    });

    this.dashboard = true;
  }

  showPayment() {
    this.showPayments = true;
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPackages = false;
  }

  showOrders() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = true;
    this.showPayments = false;
    this.showPackages = false;
  }

  showUsers() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = true;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
  }

  showProfile() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = true;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
  }

  showDashboard() {
    this.dashboard = true;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
  }

  showCategories() {
    this.dashboard = false;
    this.showProductCategories = true;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
  }

  showPackage() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = true;
  }
}
