import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from '../../models/buyer';
import { Orders } from '../../models/orders';
import { Package } from '../../models/package';
import { Payments } from '../../models/payments';
import { Seller } from '../../models/seller';
import { SubOrder } from '../../models/sub-order';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';
import { OrdersService } from '../../services/orders.service';
import { PackagesService } from '../../services/packages.service';
import { PaymentService } from '../../services/payment.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';

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
  payout = false;
  users = false;

  drawer = false;

  packages: Package[] = [];

  showProductCategories = false;

  role: any;

  thisMonthOrders = 0

  lastMonthOrders = 0

  ordersPercentageDiff: any

  totalUsers = 0

  thisMonthUsers = 0

  lastMonthUsers = 0

  usersPercentageDiff: any

  thisMonthClients = 0

  lastMonthClients = 0

  clientsPercentageDiff: any

  thisMonthPayments = 0

  totalOrders = 0;

  subOrders: SubOrder[] = [];

  lastMonthPayments = 0

  paymentsPercentageDiff: any

  orders: Orders[] = [];

  payments: Payments[] = []

  buyers: Buyer[] = [];

  sellers: Seller[] = [];

  constructor(
    private packageService: PackagesService,
    private orderService: OrdersService,
    private buyerService: BuyerRegistrationService,
    private sellerService: SellerRegistrationService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    // if (sessionStorage.length == 0 || this.role != Roles.ADMIN) {
    //   this.router.navigate(['/login']);
    // }

    this.packageService.getAllList().subscribe((res) => {
      this.packages = res.data;
      console.log('packages:', res.data);
    });

    this.orderService.getAllList().subscribe((res) => {
      this.subOrders = res.data;

      console.log('orders:', this.subOrders)

      // Calculate total orders for last month and this month
      this.lastMonthOrders = this.subOrders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.getFullYear() === new Date().getFullYear() &&
          orderDate.getMonth() === new Date().getMonth() - 1;
      }).reduce((sum, order) => sum + order.total_price, 0);

      this.thisMonthOrders = this.subOrders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.getFullYear() === new Date().getFullYear() &&
          orderDate.getMonth() === new Date().getMonth();
      }).reduce((sum, order) => sum + order.total_price, 0);

      // Calculate percentage difference
      this.ordersPercentageDiff = ((this.thisMonthOrders - this.lastMonthOrders) / this.lastMonthOrders * 100).toFixed(2)

      console.log('orders:', this.orders, this.thisMonthOrders, this.lastMonthOrders, this.ordersPercentageDiff);
    });

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;

      this.lastMonthUsers += this.buyers.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getFullYear() === new Date().getFullYear() &&
          userDate.getMonth() === new Date().getMonth() - 1;
      }).length;

      this.thisMonthUsers += this.buyers.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getFullYear() === new Date().getFullYear() &&
          userDate.getMonth() === new Date().getMonth();
      }).length;

      console.log('buyers:', this.buyers);
    });

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;

      this.lastMonthUsers += this.sellers.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getFullYear() === new Date().getFullYear() &&
          userDate.getMonth() === new Date().getMonth() - 1;
      }).length;

      this.thisMonthUsers += this.sellers.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getFullYear() === new Date().getFullYear() &&
          userDate.getMonth() === new Date().getMonth();
      }).length;

      console.log('sellers:', this.sellers);

      // Calculate percentage difference
      this.usersPercentageDiff = ((this.thisMonthUsers - this.lastMonthUsers) / this.lastMonthUsers * 100).toFixed(2)

      console.log('all:', this.lastMonthUsers, this.thisMonthUsers, this.usersPercentageDiff);
    });

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;

      this.lastMonthClients = this.sellers.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getFullYear() === new Date().getFullYear() &&
          userDate.getMonth() === new Date().getMonth() - 1;
      }).length;

      this.thisMonthClients = this.sellers.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getFullYear() === new Date().getFullYear() &&
          userDate.getMonth() === new Date().getMonth();
      }).length;


      // Calculate percentage difference
      this.clientsPercentageDiff = ((this.thisMonthClients - this.lastMonthClients) / this.lastMonthClients * 100).toFixed(2)

      console.log('all:', this.lastMonthClients, this.thisMonthClients, this.clientsPercentageDiff);
    });

    this.paymentService.getAllList().subscribe((res) => {
      this.payments = res.data;

      this.lastMonthPayments = this.payments.filter(payment => {
        const paymentDate = new Date(payment.created_at);
        return paymentDate.getFullYear() === new Date().getFullYear() &&
          paymentDate.getMonth() === new Date().getMonth() - 1;
      }).length;

      this.thisMonthPayments = this.payments.filter(payment => {
        const paymentDate = new Date(payment.created_at);
        return paymentDate.getFullYear() === new Date().getFullYear() &&
          paymentDate.getMonth() === new Date().getMonth();
      }).length;


      // Calculate percentage difference
      this.paymentsPercentageDiff = ((this.thisMonthPayments - this.lastMonthPayments) / this.lastMonthPayments * 100).toFixed(2)

      console.log('payment:', this.lastMonthPayments, this.thisMonthPayments, this.paymentsPercentageDiff);
    });

    this.dashboard = true;
  }

  showDrawer() {
    this.drawer = true;
  }

  hideDialog() {
    this.drawer = false;
  }

  showPayment() {
    this.showPayments = true;
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPackages = false;
    this.payout = false
  }

  showOrders() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = true;
    this.showPayments = false;
    this.showPackages = false;
    this.payout = false
  }

  showUsers() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = true;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
    this.payout = false
  }

  showProfile() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = true;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
    this.payout = false
  }

  showDashboard() {
    this.dashboard = true;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
    this.payout = false
  }

  showCategories() {
    this.dashboard = false;
    this.showProductCategories = true;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
    this.payout = false
  }

  showPackage() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = true;
    this.payout = false
  }

  showPayout() {
    this.dashboard = false;
    this.showProductCategories = false;
    this.profile = false;
    this.users = false;
    this.orderstab = false;
    this.showPayments = false;
    this.showPackages = false;
    this.payout = true
  }
}
