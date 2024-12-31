import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../models/response-handler';

const url = 'http://127.0.0.1:8000/api/v1';
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class SellerRegistrationService {

  constructor(private http: HttpClient) { }
    
      create(itemDto: any) {
        var body = JSON.stringify(itemDto);
        console.log(body)
        return this.http.post<ResponseHandler>(`${url}/sellers/register`, body, { headers });
      }
    
      update(itemDto: any, id: number) {
        var body = JSON.stringify(itemDto);
        console.log(body)
        return this.http.put<ResponseHandler>(`${url}/sellers/update/${id}`, body, { headers });
      }
    
      delete(id: number) {
        return this.http.delete<ResponseHandler>(`${url}/sellers/delete/${id}`);
      }
    
      getAllList() {
        return this.http.get<ResponseHandler>(`${url}/sellers`);
      }
}