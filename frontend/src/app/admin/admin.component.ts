import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { environment } from '../environment.dev';
import { KeycloakService } from './../services/keycloak.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Include CommonModule and HttpClientModule
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
@Injectable({
  providedIn: 'root',  // Ensure the service is provided globally
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  private tokenUrl: string = `${environment.KeyCloakDomain}/realms/${environment.RealmName}/protocol/openid-connect/token`;
  private clientId: string = 'edushare_client';
  private clientSecret: string = '3SdEXFK7RcefOwqXMlAjGOyJ4958mua6';

  keycloakAdminUrl = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users`;

  private token: string = '';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.getAccessToken().then(() => {
      this.loadUsers();
    });
  }

  // Get access token from Keycloak
  private getAccessToken(): Promise<void> {
    const payload = new URLSearchParams();
    payload.set('grant_type', 'client_credentials');
    payload.set('client_id', this.clientId);
    payload.set('client_secret', this.clientSecret);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise((resolve, reject) => {
      this.http
        .post<any>(this.tokenUrl, payload.toString(), { headers })
        .subscribe(
          (response) => {
            this.token = response.access_token;
            resolve();
          },
          (error) => {
            console.error('Error getting access token:', error);
            reject(error);
          }
        );
    });
  }

  // Load all users from Keycloak
  private loadUsers(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http
      .get<any[]>(this.keycloakAdminUrl, { headers })
      .subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
  }

  // Activate a user
  activateUser(userId: string): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const activateUrl = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}/enable`;

    this.http
      .put(activateUrl, {}, { headers })
      .subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error activating user:', error);
        }
      );
  }

  // Deactivate a user
  deactivateUser(userId: string): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const deactivateUrl = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}/disable`;

    this.http
      .put(deactivateUrl, {}, { headers })
      .subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deactivating user:', error);
        }
      );
  }

  // Delete a user
  /*
  deleteUser(userId: string): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const deleteUrl = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}`;

    this.http
      .delete(deleteUrl, { headers })
      .subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
  }*/
      deleteUser(userId: string): void {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
          const deleteUrl = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}`;

          this.http
            .delete(deleteUrl, { headers })
            .subscribe(
              () => {
                this.loadUsers();
              },
              (error) => {
                console.error('Error deleting user:', error);
              }
            );
        }
      }
}
