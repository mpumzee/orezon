import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package';
import { ResponseHandler } from '../models/response-handler';

const url = 'https://orezon.co.zw/api/v1';
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');


@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient) { }
  
    create(itemDto: any) {
      var body = JSON.stringify(itemDto);
      console.log(body)
      return this.http.post<ResponseHandler>(`${url}/packages/register`, body, { headers });
    }
  
    update(itemDto: any, id: number) {
      var body = JSON.stringify(itemDto);
      console.log(body)
      return this.http.put<ResponseHandler>(`${url}/packages/update/${id}`, body, { headers });
    }
  
    delete(id: number) {
      return this.http.delete<ResponseHandler>(`${url}/packages/delete/${id}`);
    }
  
    getAllList() {
      return this.http.get<ResponseHandler>(`${url}/packages`);
    }
}
