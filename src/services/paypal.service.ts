import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../models/response-handler';


const url = 'https://orezon.co.zw/api/v1';
let headers: HttpHeaders = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
headers.append('enctype', 'multipart/form-data');


@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private http: HttpClient) { }

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(itemDto);
    return this.http.post<ResponseHandler>(`${url}/paypal/create-order`, itemDto, {
      headers,
    });
  }

}
