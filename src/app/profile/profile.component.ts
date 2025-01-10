import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../enums/country';
import { BankDetails } from '../../models/bank-details';
import { Package } from '../../models/package';
import { Seller } from '../../models/seller';
import { User } from '../../models/user';
import { PackagesService } from '../../services/packages.service';
import { SellerRegistrationService } from '../../services/seller-registration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  countries: any[] = [];

  editProfileModal = false;

  public sellerForm: FormGroup;

  user: User = {} as User;

  success = false;

  successMsg: any;

  errorMsg: any;

  error = false;

  title: any;

  msg: any;

  packages: Package[] = [];

  curentSellerDetails: Seller = {} as Seller;

  bankDetails: BankDetails = {} as BankDetails;

  role: any;

  sellers: Seller[] = [];

  bank_details: BankDetails = {} as BankDetails;

  selectedPackage: Package = {} as Package;

  packageId = 0;

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
      bank: new FormControl('', [Validators.required]),
      account_number: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      branch_code: new FormControl('', [Validators.required]),
      // name: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.email]),
      // password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      // password_confirmation: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';
    this.bankDetails.account_number =
      sessionStorage.getItem('loggedUserAccountNumber') || '{}';
    this.bankDetails.bank = sessionStorage.getItem('loggedUserBank') || '{}';
    this.bankDetails.branch =
      sessionStorage.getItem('loggedUserBranch') || '{}';
    this.bankDetails.branch_code =
      sessionStorage.getItem('loggedUserBranchCode') || '{}';
    this.bankDetails.id = JSON.parse(
      sessionStorage.getItem('loggedUserBankDetailsId') || '{}'
    );
    console.log('details', this.bankDetails);

    if (!this.user) {
      this.router.navigate(['/login']);
    }

    this.sellerService.getAllList().subscribe((res) => {
      this.sellers = res.data.filter((x) => x.user_id == this.user.id);
      this.sellers.forEach((seller) => {
        this.curentSellerDetails = seller;
      });
      console.log('seller:', res.data);
    });

    this.packageService.getAllList().subscribe((res) => {
      this.packages = res.data;
      if (!this.packages) {
        console.log('no package');
      } else {
        this.packageId! = JSON.parse(
          sessionStorage.getItem('loggedUserPackageId') || '{}'
        )!;
        this.packages
          .filter((x) => x.id == this.packageId)
          .forEach((pack) => {
            this.selectedPackage = pack;
          });
      }

      console.log('packages:', res.data);
    });

    this.countries = Object.values(Country);
  }

  edit() {
    this.sellerForm = new FormGroup({
      business_name: new FormControl(this.curentSellerDetails.business_name, [
        Validators.required,
      ]),
      country: new FormControl(this.curentSellerDetails.country, [
        Validators.required,
      ]),
      id_number: new FormControl(this.curentSellerDetails.id_number, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
      phone: new FormControl(this.curentSellerDetails.phone, [
        Validators.required,
        Validators.minLength(10),
      ]),
      bank: new FormControl(this.bankDetails.bank, [
        Validators.required,
        Validators.minLength(10),
      ]),
      account_number: new FormControl(this.bankDetails.account_number, [
        Validators.required,
        Validators.minLength(10),
      ]),
      branch: new FormControl(this.bankDetails.branch, [
        Validators.required,
        Validators.minLength(10),
      ]),
      branch_code: new FormControl(this.bankDetails.branch_code, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    console.log('yes');

    this.editProfileModal = true;
  }

  update() {
    this.sellerService
      .update(this.sellerForm.value, this.curentSellerDetails.id)
      .subscribe(
        (res) => {
          if (res.status == 'success') {
            console.log(res.message);
            this.editProfileModal = false;
            this.success = true;
            this.title = res.status;
            this.successMsg = res.message;
            this.ngOnInit();
          } else {
            console.error(Error);
          }
        },
        (error) => {
          console.error(error.error.message);
          this.error = true;
          this.title = error.error.status;
          this.errorMsg = error.error.message;
        }
      );

    this.sellerForm.reset();
  }

  changePackage() {
    this.router.navigate(['/select-package']);
  }

  hideDialog() {
    this.success = false;
    this.error = false;
    this.editProfileModal = false;
  }
}
