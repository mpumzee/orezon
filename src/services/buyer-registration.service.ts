import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../models/response-handler';

// const url = 'http://localhost:8000/api/v1';
const url = 'http://127.0.0.1:8000/api/v1';
const headers: HttpHeaders = new HttpHeaders().set(
  'Content-Type',
  'application/json, charset=utf-8'
);

@Injectable({
  providedIn: 'root',
})
export class BuyerRegistrationService {
  constructor(private http: HttpClient) {}

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log('item dto ', itemDto);
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

  getAllList() {
    return this.http.get<ResponseHandler>(`${url}/buyer`);
  }
}
