import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../../enums/roles';
import { Buyer } from '../../models/buyer';
import { Package } from '../../models/package';
import { ProductCategory } from '../../models/product-category';
import { Seller } from '../../models/seller';
import { SubOrder } from '../../models/sub-order';
import { User } from '../../models/user';
import { OrdersService } from '../../services';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';
import { PackagesService } from '../../services/packages.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  subOrders: SubOrder[] = [];

  user: User = {} as User;

  sellers: Seller[] = [];

  buyers: Buyer[] = [];

  buyer_pic: any;

  selectedOrder: SubOrder = {} as SubOrder;

  viewOrderModal = false;

  seller: Seller = {} as Seller;

  categories: ProductCategory[] = [];

  packages: Package[] = [];

  show = false;

  drawer = false;

  dashboard = false;
  profile = false;
  orders = false;
  products = false;
  payment = false;

  role: any;

  countries: any[] = [];

  public sellerForm: FormGroup;

  public bankForm: FormGroup;

  constructor(
    private packageService: PackagesService,
    private router: Router,
    private orderService: OrdersService,
    private sellerService: SellerRegistrationService,
    private buyerService: BuyerRegistrationService,
    private categoryService: SubCategoriesService
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

    if (sessionStorage.length == 0 || this.role != Roles.SELLER) {
      this.router.navigate(['/login']);
    }

    this.packageService.getAllList().subscribe((res) => {
      this.packages = res.data;
      console.log('packages:', res.data);
    });


    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);
    });

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;
      console.log('buyer:', res.data);
    });

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;
      console.log('sellers:', res.data);
    });

    this.orderService.getSellerOrders().subscribe((res) => {
      this.subOrders = res.data;
      this.subOrders.forEach((order) => {
        order.total_quantity = 0;
        this.buyers
          .filter((x) => x.user_id == order.buyer_id)
          .forEach((buyer) => {
            console.log('entered', buyer);
            order.buyer_pic =
              'https://orezon.co.zw/storage/app/public/' + buyer.profile_pic;
            order.buyer_name = buyer.user.name;
            order.buyer_email = buyer.user.email;
          });
        order.products.forEach((prod: any) => {
          prod.image_url =
            'https://orezon.co.zw/storage/app/public/' + prod.image_url;
          const category = this.categories.filter(
            (x) => x.id == prod.sub_category_id
          );
          category.forEach((cat) => {
            prod.sub_category_name = cat.name;
          });
          this.sellers
            .filter((x) => x.user_id == order.seller_id)
            .forEach((seller) => {
              prod.business_name = seller.business_name;
            });
          order.total_quantity += prod.pivot.quantity;
        });
      });
      console.log('orders:', this.orders);
    });
  }

  showDrawer() {
    this.drawer = true;
  }

  viewOrder(item: SubOrder) {
    console.log('item', item);
    this.viewOrderModal = true;
    this.selectedOrder = item;
  }


  hideDialog() {
    this.drawer = false;
    this.viewOrderModal = false;
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

  update() { }
}
