import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const url = 'https://orezon.co.zw/api/v1';
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class BuyerRegistrationService {

  constructor(private http: HttpClient) { }

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.post<any>(`${url}/createBuyer`, body, { headers });
  }

  update(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${url}/updateBuyer`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${url}/deleteBuyer/${id}`);
  }

  getAllList() {
    return this.http.get<any>(`${url}/getAllBuyers`);
  }
}
