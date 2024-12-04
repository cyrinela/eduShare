import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment.dev';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiURL: string = 'http://localhost:8888/GS-USERS';
  private tokenUrl: string = `${environment.KeyCloakDomain}/realms/${environment.RealmName}/protocol/openid-connect/token`;
  private UserCreationUrl: string = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users`;


  constructor(private http : HttpClient) {}

  login(clientCredentials: {username:string, password:string}):Observable<any> {
    // set Payload data
    const payload = new URLSearchParams();
    payload.set('grant_type', 'password');
    payload.set('client_id', environment.client_id);
    payload.set('client_secret',environment.client_secret)
    payload.set('username', clientCredentials.username);
    payload.set('password', clientCredentials.password);


    return this.http.post(`${this.tokenUrl}`, payload.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}} );
  }

  createCookies(Token: string):Observable<any> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${Token}`),
      withCredentials: true 
    }
    return this.http.get(`${this.apiURL}/auth`, header);
  }

  loginAdmin():Observable<any> {
    // set payload data
    const payload = new URLSearchParams();
    payload.set('grant_type', 'client_credentials');
    payload.set('client_id', environment.client_id);
    payload.set('client_secret',environment.client_secret);

    return this.http.post(`${this.tokenUrl}`, payload.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}} );
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
  }, AdminToken : string):Observable<any> {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${AdminToken}`),
    }

    return this.http.post(`${this.UserCreationUrl}`, credentials, header);
  }

  async assignRole(AdminToken: string, username: string, rolename: string) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${AdminToken}`),
    };

    // GET USER
    const user = 
      await this.http.get<any>(`${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users?username=${username}`,header)
    .toPromise().catch((error) => {console.error(error);});
    // GET ROLE
    const role = 
    await this.http.get<any>(`${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/clients/${environment.client_uuid}/roles/${rolename}`,header)
    .toPromise().catch((error) => {console.error(error);});

    // ASSIGN ROLE TO USER
    await this.http
    .post(`${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${user[0].id}/role-mappings/clients/${environment.client_uuid}`,
      [
        {
          "id": role.id,
          "name": rolename
        }
      ],
      header
    ).toPromise().then((success) => {
      console.log("Role assigned");
    }).catch((error) => {
      console.error("Internal error occured, Please try again");
    });
  }
}
