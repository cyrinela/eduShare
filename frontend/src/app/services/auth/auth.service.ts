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
    console.log(credentials);
    
    return this.http.post(`${this.apiURL}/login`, credentials,
    { 
      withCredentials: true 
    });
  }
}
