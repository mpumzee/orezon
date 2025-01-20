import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierCartService } from '../../services';

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

  constructor(private router: Router, private supplierCartService: SupplierCartService,) { }

  ngOnInit(): void {
    this.getCartInformation();
    if (sessionStorage.length === 0) {
      this.logIn = true;
    }
    else {
      this.logOut = true
      this.home = true
      this.logIn = false
    }
  }


  getCartInformation() {

    this.supplierCartService.updateTotal.subscribe((res) => {
      if(res){

    this.currentSupplierCart = this.supplierCartService.getCurrentCart();
    this.totalSupplierCart = this.supplierCartService.getTotaltems();
    this.totalSupplierAmount = this.supplierCartService.getTotal();
      }
    })


    this.currentSupplierCart = this.supplierCartService.getCurrentCart();
    this.totalSupplierCart = this.supplierCartService.getTotaltems();
    this.totalSupplierAmount = this.supplierCartService.getTotal();

  }

  removeItem(item) {
    //
  }

}
