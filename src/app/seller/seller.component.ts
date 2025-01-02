import { Component } from '@angular/core';
import { Seller } from '../../models/seller';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';
import { Package } from '../../models/package';
import { Country } from '../../enums/country';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {

  newSeller: Seller = {} as Seller

  countries: any[] = [];

  packages: Package[] = [];

  public sellerForm: FormGroup;
          package: any;
          errorMessage = "";
          successMessage = "";

  public bankForm: FormGroup;
          bank: any;
      
          constructor(private sellerService: SellerRegistrationService, private packageService: PackagesService) {
              this.sellerForm = new FormGroup({
                business_name: new FormControl('', [Validators.required]),     
                country: new FormControl('', [Validators.required]),     
                id_number: new FormControl(1, [Validators.required, Validators.min(11), Validators.max(12)]),
                phone: new FormControl(1, [Validators.required, Validators.min(10)])
              });
              this.bankForm = new FormGroup({
                bank: new FormControl('', [Validators.required]),     
                account_number: new FormControl('', [Validators.required]),     
                branch: new FormControl('', [Validators.required]),
                branch_code: new FormControl('', [Validators.required]),
              });
          }

           ngOnInit(): void {
          
                  this.packageService.getAllList()
                  .subscribe(res => {
                    this.packages = res.data;
                    console.log('packages:', this.packages)
                  });
          
                  this.countries = Object.values(Country)
            }

             createSeller() {
            
                    console.log(this.sellerForm.value);
                    this.newSeller = this.sellerForm.value;
                    this.newSeller.user_id = 1;
                    this.newSeller.name = 'Mthokozisi';
                    this.newSeller.email = this.newSeller.name + this.newSeller.id_number + '@gmail.com';
                    this.newSeller.role = 'buyer';
                    this.newSeller.password = 'Mthokozisi02.';
                    this.newSeller.password_confirmation = 'Mthokozisi02.';
                    this.newSeller.bank_details = this.bankForm.value;
                    console.log('seller',this.newSeller);
            
                    this.sellerService.create(this.newSeller)
                      .subscribe((res) => {
                        console.log(res);
                
                        if (res.status == 'success') {
                          console.log(res.msg)
                        }
                        else {
                          console.log('yes')
                          console.log(res.msg);
                    // Handle the error as needed
                        }
                
                      },
                        (error) => {
                          console.error(error);
                          // Handle the error as needed
                        });
                
                    this.newSeller = {} as Seller;
                
                  }

}
