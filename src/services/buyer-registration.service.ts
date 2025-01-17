import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../models/response-handler';

// const url = 'http://localhost:8000/api/v1';
const url = 'https://orezon.co.zw/api/v1';
let headers: HttpHeaders = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
headers.append('enctype', 'multipart/form-data');

@Injectable({
  providedIn: 'root',
})
export class BuyerRegistrationService {
  constructor(private http: HttpClient) { }

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log('item dto ', body);
    return this.http.post<ResponseHandler>(`${url}/buyer`, itemDto, {
      headers,
    });
  }

  update(itemDto: any, id: number) {
    var body = JSON.stringify(itemDto);
    console.log(body);
    return this.http.put<ResponseHandler>(`${url}/buyer/${id}`, body, {
      headers,
    });
  }

  delete(id: number) {
    return this.http.delete<ResponseHandler>(`${url}/buyer/${id}`);
  }

  get(id: number) {
    return this.http.get<ResponseHandler>(`${url}/buyer/${id}`);
  }

  getAllList() {
    return this.http.get<ResponseHandler>(`${url}/buyer`);
  }
}
