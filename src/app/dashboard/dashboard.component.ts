import { Component } from '@angular/core';
import { Package } from '../../models/package';
import { PackagesService } from '../../services/packages.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerRegistrationService } from '../../services/seller-registration.service';
import { Tabs } from 'flowbite';
import type { TabsOptions, TabsInterface, TabItem } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  packages: Package[] = []

  show = false

  dashboard = false
  profile = false
  orders = false
  products = false

  user: any

  countries: any[] = [];

    public sellerForm: FormGroup;

    public bankForm: FormGroup;

  constructor(private packageService: PackagesService, private router: Router, private sellerService: SellerRegistrationService){
    this.sellerForm = new FormGroup({
      business_name: new FormControl('', [Validators.required]),     
      country: new FormControl('', [Validators.required]),     
      id_number: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      name: new FormControl('', [Validators.required]),     
      email: new FormControl('', [Validators.email]), 
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
    this.bankForm = new FormGroup({
      bank: new FormControl('', [Validators.required]),     
      account_number: new FormControl('', [Validators.required]),     
      branch: new FormControl('', [Validators.required]),
      branch_code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void{

    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');

    if (sessionStorage.length == 0) {
      this.router.navigate(['/login']);
    }

    this.packageService.getAllList()
      .subscribe(res => {
        this.packages = res.data;
        console.log('packages:', res.data)
      });
  }

  update(){}

}
