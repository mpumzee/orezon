import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'inspector';
import { ResponseHandler } from '../models/response-handler';



@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  url = environment.url;
  headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json, charset=utf-8'
  );


   constructor(private http: HttpClient) {}

   postOrder(itemDto: any) {
     var body = JSON.stringify(itemDto);
     return this.http.post<ResponseHandler>(`${url}/packages/register`, body, {
       ...this.headers,
     });
   }


}
