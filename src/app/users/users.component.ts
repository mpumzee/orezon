import { Component } from '@angular/core';
import { Roles } from '../../enums/roles';
import { Buyer } from '../../models/buyer';
import { Seller } from '../../models/seller';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  buyers: Buyer[] = [];

  sellers: Seller[] = [];

  roles: any[] = [];

  showBuyers = false;

  showSellers = false;

  showAdmins = false;

  constructor(
    private buyerService: BuyerRegistrationService,
    private sellerService: SellerRegistrationService
  ) { }

  ngOnInit() {
    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data;
      this.buyers.forEach((buyer) => {
        buyer.profile_pic = 'assets/img/user.png' + buyer.profile_pic;
      });
      console.log('buyers:', this.buyers);

      this.roles = Object.values(Roles);
    });

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data;
      console.log('sellers:', this.sellers);
    });
  }

  viewProfile(item: any) { }

  onSelection(item: any) {
    const selectedRole = (item.target as HTMLSelectElement).value;

    if (selectedRole == Roles.BUYER) {
      this.showBuyers = true;
      this.showSellers = false;
    } else if (selectedRole == Roles.SELLER) {
      this.showBuyers = false;
      this.showSellers = true;
    }
  }
}
