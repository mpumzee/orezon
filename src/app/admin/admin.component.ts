import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public equipmentForm: FormGroup;

  constructor(private router: Router, private http: HttpClient) {
    this.equipmentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),     
      brand: new FormControl('', [Validators.required]),     
      description: new FormControl('', [Validators.required]),
      category: new FormControl('Any', [Validators.required]),
      price: new FormControl(1, [Validators.required, Validators.min(1)]),
      photoUrl: new FormControl(''),
      createdBy: new FormControl("Mavutsetse"),
    });
  }

  addEquipment(){
    
  }
}
