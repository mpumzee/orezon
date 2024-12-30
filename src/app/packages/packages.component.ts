import { Component } from '@angular/core';
import { Package } from '../../models/package';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {

    packages: Package[] = []
  
    newPackage: Package = {} as Package
  
    selectedPackage: Package = {} as Package

    showModal = false;

    deleteModal = false;



    public packageForm: FormGroup;
        package: any;
        errorMessage = "";
        successMessage = "";

        public selectedPackageForm: FormGroup;
    
        constructor(private packageService: PackagesService) {
            this.packageForm = new FormGroup({
              name: new FormControl('', [Validators.required]),     
              description: new FormControl('', [Validators.required]),     
              price: new FormControl(1, [Validators.required, Validators.min(1)]),
              number_of_products: new FormControl(1, [Validators.required, Validators.min(1)]),
            });

            this.selectedPackageForm = new FormGroup({
              name: new FormControl('', [Validators.required]),     
              description: new FormControl('', [Validators.required]),     
              price: new FormControl(1, [Validators.required, Validators.min(1)]),
              number_of_products: new FormControl(1, [Validators.required, Validators.min(1)]),
            });
          }
          
          ngOnInit(): void {
            this.packageService.getAllList()
            .subscribe(res => {
              this.packages = res;
              console.log('packages:', res)
            });
          }


          createPackage() {
          
                  console.log(this.packageForm.value);
          
                  this.packageService.create(this.packageForm.value)
                    .subscribe((res) => {
                      console.log(res);
              
                      if (res.isSuccess) {
                        this.packages = [...this.packages, res.data];
                      }
                      else {
                        console.error(Error);
                  // Handle the error as needed
                      }
              
                    },
                      (error) => {
                        console.error(error);
                        // Handle the error as needed
                      });
              
                  this.newPackage = {} as Package;
              
                }
              
          updatePackage() {
            this.packageService.update(this.selectedPackage)
              .subscribe((res) => {
                console.log(res);
        
                if (res.isSuccess) {
        
                  var index = this.packages.findIndex(x => x.id === res.data.id);
                  this.packages.splice(index, 1);
        
                  this.packages = [...this.packages, res.data];
                }
                else {
                  console.error(Error);
                }
        
              },
                (error) => {
                  console.error(error.message);
                });
                
            this.selectedPackage = {} as Package;
          }


          displayModal(item: Package){
            this.hideDialog();
            this.showModal = true;
            this.selectedPackage = item
            this.selectedPackageForm = new FormGroup({
              name: new FormControl(this.selectedPackage.name, [Validators.required]),     
              description: new FormControl(this.selectedPackage.description, [Validators.required]),     
              price: new FormControl(this.selectedPackage.price, [Validators.required, Validators.min(1)]),
              number_of_products: new FormControl(this.selectedPackage.number_of_products, [Validators.required, Validators.min(1)]),
            });
          }

          displayDeleteModal(item: Package){
            this.hideDialog();
            this.deleteModal = true
          }

          hideDialog(){
            this.showModal = false
            this.deleteModal = false
          }
}
