import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package';
import { ResponseHandler } from '../models/response-handler';

const url = 'http://127.0.0.1:8000/api/v1';
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
      return this.http.post<any>(`${url}/packages/register`, body, { headers });
    }
  
    update(itemDto: any) {
      var body = JSON.stringify(itemDto);
      console.log(body)
      return this.http.put<any>(`${url}/packages/update`, body, { headers });
    }
  
    delete(id: number) {
      return this.http.delete<any>(`${url}/packages/delete/${id}`);
    }
  
    getAllList() {
      return this.http.get<any>(`${url}/packages`);
    }
}
