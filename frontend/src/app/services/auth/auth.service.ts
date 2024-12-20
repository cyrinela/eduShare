import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment.dev'; // Make sure this is set up properly




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL: string = 'http://localhost:8888/GS-USERS'; // API URL for your backend
  private IdPRedirectUrl: string = "http://localhost:8888/GS-USERS/callback"; // IDP Redirect URL
  private GoogleIdp: string = `${environment.KeyCloakDomain}/realms/${environment.RealmName}/protocol/openid-connect/auth?client_id=${environment.client_id}&redirect_uri=${this.IdPRedirectUrl}&response_type=code&scope=openid&kc_idp_hint=`; // Google IDP login URL


  constructor(private http: HttpClient, private router: Router) {}

  // Login method to authenticate user
  login(clientCredentials: { username: string, password: string }): Observable<any> {
    const payload = new FormData();
    payload.append('username', clientCredentials.username);
    payload.append('password', clientCredentials.password);

    return this.http.post(`${this.apiURL}/user/login`, payload, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          const token = response.access_token;
          const roles = this.decodeToken(token);  // Decode the token to extract roles
          this.handleRoleRedirect(roles);  // Redirect based on user role
        })
      );
  }

  // Decode JWT token to extract roles
  private decodeToken(token: string): string[] {
    try {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.realm_access?.roles || []; // Extract roles from decoded token
    } catch (error) {
      console.error("Error decoding token:", error);
      return [];
    }
  }

  // Redirect based on user role (admin, user, or others)
  private handleRoleRedirect(roles: string[]) {
    if (roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['/admin']);
    } else if (roles.includes("ROLE_USER")) {
      this.router.navigate(['/userpage']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Method to sign up a new user
  signup(credentials: {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    emailVerified: boolean,
    enabled: boolean,
    requiredActions: Array<any>,
    groups: Array<any>,
    credentials: Array<any>
  }): Observable<any> {
    return this.http.post(`${this.apiURL}/user/signup`, credentials);
  }

  // Redirect to an IDP provider (like Google) for login
  redirectIdPLogin(provider: string) {
    if (provider === "google") {
      window.location.href = `${this.GoogleIdp}${provider}`;
    }
  }

  // Get user information based on username
  getUserInfo(userName: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/userinfo?username=${userName}`);
  }

  // Reset user password
  resetPassword(newPassword: any): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    return this.http.post(`${this.apiURL}/user/resetpassword?userId=${userId}`, newPassword);
  }

  // Modify user details
  modifyUser(newData: any): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('userInfo')!).id;
    return this.http.post(`${this.apiURL}/user/modify?userId=${userId}`, newData);
  }

  // Logout method to log out the user
  logout(): Observable<any> {
    return this.http.get(`${this.apiURL}/user/logout`, {
      withCredentials: true
    });
  }

  // Check if the user is logged in (optionally)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token != null && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.exp * 1000 < Date.now(); // Compare expiry time
    } catch (error) {
      return true;
    }
  }
}
