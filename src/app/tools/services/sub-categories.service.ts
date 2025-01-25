import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHandler } from '../../../models/response-handler';
import { AlertService } from '.';

const url = 'https://orezon.co.zw/api/v1';
const headers: HttpHeaders = new HttpHeaders().set(
  'Content-Type',
  'application/json, charset=utf-8'
);

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService  extends AlertService {
  constructor(private http: HttpClient) {
    super()
   }

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(body);
    return this.http.post<ResponseHandler>(`${url}/sub-categories`, body, {
      headers,
    });
  }

  createCategory(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(body);
    return this.http.post<ResponseHandler>(`${url}/categories`, body, {
      headers,
    });
  }

  update(itemDto: any, id: number) {
    var body = JSON.stringify(itemDto);
    console.log(body);
    return this.http.put<ResponseHandler>(`${url}/sub-categories/${id}`, body, {
      headers,
    });
  }

  delete(id: number) {
    return this.http.delete<ResponseHandler>(`${url}/sub-categories/${id}`);
  }

  getAllList() {
    return this.http.get<ResponseHandler>(`${url}/sub-categories`);
  }
}
