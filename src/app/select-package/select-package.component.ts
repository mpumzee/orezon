import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Package } from '../../models/package';
import { UserPackage } from '../../models/user-package';
import { SellerCartService } from '../../services';
import { PackagesService } from '../../services/packages.service';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-select-package',
  templateUrl: './select-package.component.html',
  styleUrl: './select-package.component.css',
})
export class SelectPackageComponent {
  packages: Package[] = [];

  user: any;

  userPackage: UserPackage = {} as UserPackage;

  constructor(
    private packageService: PackagesService,
    private router: Router,
    private userService: SignUpService,
    private sellerCartService: SellerCartService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');

    if (sessionStorage.length == 0) {
      this.router.navigate(['/login']);
    }

    this.packageService.getAllList().subscribe((res) => {
      this.packages = res.data;
      console.log('packages:', this.packages);
    });
  }

  selectPackage(item: any) {
    this.sellerCartService.addToSupplierCart(item, item.price, 1);

  }
}
