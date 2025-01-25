import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Buyer } from '../../../models/buyer';
import { Country } from '../../tools/models';
import { BuyerRegistrationService } from '../../tools/services';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css',
})
export class BuyerComponent {
  buyerProfile: Buyer[] = [];

  errorMsg: any;

  error = false;

  title: any;

  msg: any;

  newBuyerProfile: Buyer = {} as Buyer;

  countries: any[] = [];

  selectedBuyerProfile: Buyer = {} as Buyer;

  errorAlert = false;

  public profileForm: FormGroup;
  selectedFile: File | null = null;
  profile: any;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private buyerRegistrationService: BuyerRegistrationService
  ) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [Validators.required]),
      id_number: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.buyerRegistrationService.getAllList().subscribe((res) => {
      this.buyerProfile = res.data;
    });

    this.countries = Object.values(Country);
  }

  check() {
    if (
      this.profileForm.value.password !==
      this.profileForm.value.password_confirmation
    ) {
      this.errorAlert = true;
    } else {
      this.errorAlert = false;
    }
  }

  hideDialog() {
    this.error = false;
  }

  createProfile() {
    if (
      this.profileForm.value.password !==
      this.profileForm.value.password_confirmation
    ) {
      this.errorAlert = true;
    } else {
      //this.profileForm.value.profile_pic = this.selectedFile

      let formData = new FormData();
      formData.append('name', this.profileForm.value.name);
      formData.append('email', this.profileForm.value.email);
      formData.append('password', this.profileForm.value.password);
      formData.append(
        'password_confirmation',
        this.profileForm.value.password_confirmation
      );
      formData.append('id_number', this.profileForm.value.id_number);
      formData.append('country', this.profileForm.value.country);
      formData.append('address', this.profileForm.value.address);
      formData.append('phone', this.profileForm.value.phone);

      formData.forEach((value, key) => {
        console.log(key + ' ' + value);
      });

      this.buyerRegistrationService.create(formData).subscribe({
        next: (res) => {
          this.buyerProfile = [...this.buyerProfile, res.data];
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
          alert(error.error.message);
          // Handle the error as needed
        },
      });
    }

    this.newBuyerProfile = {} as Buyer;
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files!.item(0);

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
