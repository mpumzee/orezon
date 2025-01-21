import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerCartService } from '../../services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  user: any;
  totalSupplierCart: any = 0;
  totalSupplierAmount: any = 0;
  currentSupplierCart: any = [];

  dashboard = false
  logIn = false
  logOut = false
  home = false

  constructor(private router: Router, private sellerCartService: SellerCartService) { }

  ngOnInit(): void {
    this.getCartInformation();
    if (sessionStorage.length === 0) {
      this.logIn = true;
    }
    else {
      this.logOut = true
      this.home = true
      this.logIn = false
      this.dashboard = true
    }
  }


  getCartInformation() {

    this.sellerCartService.updateTotal.subscribe((res) => {
      if (res) {

        this.currentSupplierCart = this.sellerCartService.getCurrentCart();
        this.totalSupplierCart = this.sellerCartService.getTotaltems();
        this.totalSupplierAmount = this.sellerCartService.getTotal();
      }
    })


    this.currentSupplierCart = this.sellerCartService.getCurrentCart();
    this.totalSupplierCart = this.sellerCartService.getTotaltems();
    this.totalSupplierAmount = this.sellerCartService.getTotal();

  }

  removeItem(item) {
    //
  }

}
