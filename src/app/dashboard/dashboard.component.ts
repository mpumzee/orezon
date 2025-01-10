import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from '../../models/package';
import { PackagesService } from '../../services/packages.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  packages: Package[] = [];

  show = false;

  dashboard = false;
  profile = false;
  orders = false;
  products = false;
  payment = false;

  user: any;

  role: any;

  countries: any[] = [];

  public sellerForm: FormGroup;

  public bankForm: FormGroup;

  constructor(
    private packageService: PackagesService,
    private router: Router,
    private sellerService: SellerRegistrationService
  ) {
    this.sellerForm = new FormGroup({
      business_name: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      id_number: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
    this.bankForm = new FormGroup({
      bank: new FormControl('', [Validators.required]),
      account_number: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      branch_code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.dashboard = true;

    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    // if (sessionStorage.length == 0 || this.role != Roles.SELLER) {
    //   this.router.navigate(['/login']);
    // }

    this.packageService.getAllList().subscribe((res) => {
      this.packages = res.data;
      console.log('packages:', res.data);
    });
  }

  showDashboard() {
    this.dashboard = true;
    this.products = false;
    this.profile = false;
    this.orders = false;
    this.payment = false;
  }

  showProducts() {
    this.dashboard = false;
    this.products = true;
    this.profile = false;
    this.orders = false;
    this.payment = false;
  }

  showProfile() {
    this.dashboard = false;
    this.products = false;
    this.profile = true;
    this.orders = false;
    this.payment = false;
  }

  showOrders() {
    this.dashboard = false;
    this.products = false;
    this.profile = false;
    this.orders = true;
    this.payment = false;
  }

  showPayment() {
    this.dashboard = false;
    this.products = false;
    this.profile = false;
    this.orders = false;
    this.payment = true;
  }

  update() {}
}
