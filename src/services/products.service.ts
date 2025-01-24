import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../models/response-handler';

const url = 'https://orezon.co.zw/api/v1';
let headers: HttpHeaders = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
headers.append('enctype', 'multipart/form-data');

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(itemDto);
    return this.http.post<ResponseHandler>(`${url}/products/create`, itemDto, {
      headers,
    });
  }

  update(itemDto: any, id: number) {
    var body = JSON.stringify(itemDto);
    console.log(body);
    return this.http.put<ResponseHandler>(
      `${url}/products/update/${id}`,
      body,
      { headers }
    );
  }

  delete(id: number) {
    return this.http.delete<ResponseHandler>(`${url}/products/${id}`);
  }

  get(id: number) {
    return this.http.delete<ResponseHandler>(`${url}/products/${id}`);
  }

  getSellerProducts(id: number) {
    return this.http.get<ResponseHandler>(`${url}/products/seller/${id}`);
  }

  getAllList() {
    return this.http.get<ResponseHandler>(`${url}/products`);
  }
}
