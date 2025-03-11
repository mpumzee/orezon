import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../../../models/response-handler';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService extends AlertService {

  url = 'https://ore-zone.com/api/v1';
  constructor(private http: HttpClient) {
    super()
  }

  sendMessage(contact: any) {
    return this.http.post<ResponseHandler>(`${this.url}/contact`, contact);
  }


  sendEquiry(contact: any) {
    return this.http.post<ResponseHandler>(`${this.url}/enquiry`, contact);
  }

}
