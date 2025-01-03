import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'https://orezon.co.zw/api/v1';
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }
  
    signUp(itemDto: any) {
      var body = JSON.stringify(itemDto);
      console.log(body)
      return this.http.post<any>(`${url}/register`, body, { headers });
    }

    login(itemDto: any) {
      var body = JSON.stringify(itemDto);
      console.log(body)
      return this.http.post<any>(`${url}/login`, body, { headers });
    }
}
