import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../models/response-handler';

const url = 'http://127.0.0.1:8000/api/v1';
const headers: HttpHeaders = new HttpHeaders().set(
  'Content-Type',
  'application/json, charset=utf-8'
);

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getSellerOrders(id: number) {
    return this.http.get<ResponseHandler>(`${url}/orders/${id}`);
  }

  getAllList() {
    return this.http.get<ResponseHandler>(`${url}/orders`);
  }
}
