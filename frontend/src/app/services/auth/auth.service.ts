import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiURL: string = 'http://localhost:8888/GS-USERS';


  constructor(private http : HttpClient) {}

  login(credentials: {username:string, password:string}):Observable<any> {
    return this.http.post(`${this.apiURL}/login`, credentials,
    { 
      withCredentials: true 
    });
  }

  signup(credentials: {username:string, password:string, roles: any}):Observable<any> {
    return this.http.post(`${this.apiURL}/signup`, credentials,
      { 
        withCredentials: true 
      }
    );
  }
}
