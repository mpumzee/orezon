import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../enums/country';
import { Buyer } from '../../models/buyer';
import { User } from '../../models/user';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrl: './buyer-profile.component.css',
})
export class BuyerProfileComponent {
  countries: any[] = [];

  editProfileModal = false;

  public buyerForm: FormGroup;

  user: User = {} as User;

  success = false;

  successMsg: any;

  errorMsg: any;

  error = false;

  title: any;

  msg: any;

  curentBuyerDetails: Buyer = {} as Buyer;

  buyers: Buyer[] = [];

  role: any;

  constructor(
    private router: Router,
    private buyerService: BuyerRegistrationService
  ) {
    this.buyerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      id_number: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit(): void {
    this.user.id = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    this.buyerService.getAllList().subscribe((res) => {
      this.buyers = res.data.filter((x) => x.user_id == this.user.id);
      this.buyers.forEach((buyer) => {
        this.curentBuyerDetails = buyer;
      });
      console.log('buyer:', this.curentBuyerDetails);
    });

    this.countries = Object.values(Country);
  }

  edit() {
    this.buyerForm = new FormGroup({
      country: new FormControl(this.curentBuyerDetails.country, [
        Validators.required,
      ]),
      id_number: new FormControl(this.curentBuyerDetails.id_number, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
      phone: new FormControl(this.curentBuyerDetails.phone, [
        Validators.required,
        Validators.minLength(10),
      ]),
      address: new FormControl(this.curentBuyerDetails.address, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    console.log('yes', this.buyerForm);

    this.editProfileModal = true;
  }

  update() {
    this.buyerService
      .update(this.buyerForm.value, this.curentBuyerDetails.id)
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

    this.buyerForm.reset();
  }

  hideDialog() {
    this.success = false;
    this.error = false;
    this.editProfileModal = false;
  }
}