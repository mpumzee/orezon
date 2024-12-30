import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerRegistrationService } from '../../services/buyer-registration.service';
import { Buyer } from '../../models/buyer';
import { Country } from '../../enums/country';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css'
})
export class BuyerComponent {

  buyerProfile: Buyer[] = []

  newBuyerProfile: Buyer = {} as Buyer

  countries: any[] = [];

  selectedBuyerProfile: Buyer = {} as Buyer


  public profileForm: FormGroup;
    selectedFile: File | null = null;
    profile: any;
    errorMessage = "";
    successMessage = "";

    constructor(private router: Router, private http: HttpClient, private buyerRegistrationService: BuyerRegistrationService) {
        this.profileForm = new FormGroup({
          full_name: new FormControl('', [Validators.required]),     
          national_id: new FormControl('', [Validators.required]),     
          country: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required]),
          address: new FormControl('', [Validators.required]),
          contact_number: new FormControl('', [Validators.required]),
          propic: new FormControl(''),
          created_by: new FormControl(0),
        });
      }

      ngOnInit(): void {

        this.buyerRegistrationService.getAllList()
        .subscribe(res => {
          this.buyerProfile = res.data;
          console.log('buyer:', this.buyerProfile)
        });

        this.countries = Object.values(Country)
        console.log('countries:',this.countries)
      }


      createProfile() {

        console.log(this.profileForm.value);

        this.buyerRegistrationService.create(this.profileForm.value)
          .subscribe((res) => {
            console.log(res);
    
            if (res.isSuccess) {
              this.buyerProfile = [...this.buyerProfile, res.data];
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
    
        this.newBuyerProfile = {} as Buyer;
    
      }
    
      updateProfile() {
        this.buyerRegistrationService.update(this.selectedBuyerProfile)
          .subscribe((res) => {
            console.log(res);
    
            if (res.isSuccess) {
    
              var index = this.buyerProfile.findIndex(x => x.id === res.data.id);
              this.buyerProfile.splice(index, 1);
    
              this.buyerProfile = [...this.buyerProfile, res.data];
            }
            else {
              console.error(Error);
            }
    
          },
            (error) => {
              console.error(error.message);
            });
            
        this.selectedBuyerProfile = {} as Buyer;
      }

      onFileSelected(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.selectedFile = (target as HTMLInputElement).files!.item(0);

        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.displayImage(e.target!.result as string);
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    displayImage(imageData: string): void {
      // Update the image preview in the template
      this.imagePreview = imageData;
  }

  imagePreview: string = '';

    getImagePreview(): string {
      if (!this.selectedFile) {
          return 'assets/img/upload.svg';
      }
      return URL.createObjectURL(this.selectedFile);
  }
}
