import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment.dev';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiURL: string = 'http://localhost:8888/GS-USERS';
  
  private IdPRedirectUrl:string = "http://localhost:8888/GS-USERS/callback";
  private GoogleIdp: string = `${environment.KeyCloakDomain}/realms/${environment.RealmName}/protocol/openid-connect/auth?client_id=${environment.client_id}&redirect_uri=${this.IdPRedirectUrl}&response_type=code&scope=openid&kc_idp_hint=`;


  constructor(private http : HttpClient, private router : Router, private ActiveRoute: ActivatedRoute) {}

  login(clientCredentials: {username:string, password:string}):Observable<any> {
    // set Payload data
    const payload = new FormData();
    payload.append('username', clientCredentials.username);
    payload.append('password', clientCredentials.password);

    return this.http.post(`${this.apiURL}/user/login`, payload, {
      withCredentials : true
    } );
  }

  signup(
    credentials: {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    emailVerified: boolean,
    enabled: boolean,
    requiredActions: Array<any>,
    groups: Array<any>,
    credentials: Array<any>
  }):Observable<any> {

    return this.http.post(`${this.apiURL}/user/signup`, credentials);
  }

  RiderectIdPLogin(provider:string) {
    if (provider == "google") {
      window.location.href = `${this.GoogleIdp}${provider}`;
    }
  }

  getUserInfo(userName:string) : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/userinfo?username=${userName}`);
  }

  resetPassword(newPassword : any) : Observable<any> {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    return this.http.post(`${this.apiURL}/user/resetpassword?userId=${userId}`, newPassword);
  }

  modifyUser(newData : any) : Observable<any> {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    return this.http.post(`${this.apiURL}/user/modify?userId=${userId}`, newData);
  }

  logout():Observable<any> {
    return this.http.get(`${this.apiURL}/user/logout`, {
      withCredentials : true
    } );
  }

}