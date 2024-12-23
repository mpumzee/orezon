import { Injectable, signal } from '@angular/core';
import { Equipment } from '../models/equipment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { 
    this.getEquipment();
  }

  equipmentList = signal<Equipment[]>([]);

  getEquipment(){
    const url = "http://localhost:8000/api/v1/equipment";
    this.http.get(url).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.equipmentList.set(data.data)
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      }
    });
    }
}
