import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../environment.dev';
import { KeycloakService } from '../../services/keycloak.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  totalUsers: number = 0;
  activeUsers: number = 0;
  deactivatedUsers: number = 0;
  searchTerm: string = '';

  private tokenUrl: string = `${environment.KeyCloakDomain}/realms/${environment.RealmName}/protocol/openid-connect/token`;
  private clientId: string = 'edushare_client';
  private clientSecret: string = '3SdEXFK7RcefOwqXMlAjGOyJ4958mua6';
  private keycloakAdminUrl = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users`;

  private token: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.getAccessToken().then(() => {
      this.loadUsers();
      this.searchSubject.pipe(debounceTime(300)).subscribe((term: string) => {
        this.searchUsers(term);
      });
    });
  }

  private async getAccessToken(): Promise<void> {
    const payload = new URLSearchParams();
    payload.set('grant_type', 'client_credentials');
    payload.set('client_id', this.clientId);
    payload.set('client_secret', this.clientSecret);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    try {
      const response = await this.http.post<any>(this.tokenUrl, payload.toString(), { headers }).toPromise();
      this.token = response.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      alert('Failed to get access token. Please try again.');
    }
  }

  private loadUsers(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<any[]>(this.keycloakAdminUrl, { headers }).subscribe(
      (users) => {
        this.users = users;
        this.calculateUserStats();
      },
      (error) => {
        console.error('Error loading users:', error);
        alert('Failed to load users. Please try again.');
      }
    );
  }

  private calculateUserStats(): void {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter((user) => user.enabled).length;
    this.deactivatedUsers = this.totalUsers - this.activeUsers;
  }

  activateUser(userId: string): void {
    const url = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}`;
    const body = { enabled: true };  // Set 'enabled' to true to activate the user.
    this.confirmAction('activate', userId, url, 'put', body);
  }

  deactivateUser(userId: string): void {
    const url = `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}`;
    const body = { enabled: false };  // Set 'enabled' to false to deactivate the user.

    this.confirmAction('deactivate', userId, url, 'put', body);
  }

  deleteUser(userId: string): void {
    this.confirmAction('delete', userId, `${environment.KeyCloakDomain}/admin/realms/${environment.RealmName}/users/${userId}`, 'delete');
  }

  onSearchChange(searchValue: string): void {
    this.searchTerm = searchValue;
    this.searchSubject.next(searchValue);  // Emit the search term to trigger the debounce
  }

  searchUsers(term: string): void {
    term = term.trim().toLowerCase();
    if (term) {
      this.users = this.users.filter(user => user.username.toLowerCase().includes(term));
    } else {
      this.loadUsers();
    }
  }

  private confirmAction(action: string, userId: string, url: string, method: 'put' | 'delete' = 'put', body: any = {}): void {
    const confirmMessage = `Are you sure you want to ${action} this user?`;
    if (window.confirm(confirmMessage)) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const request = method === 'put' ? this.http.put(url, body, { headers }) : this.http.delete(url, { headers });

      request.subscribe(
        () => {
          alert(`User ${action}d successfully!`);
          this.loadUsers();  // Reload the users after action
        },
        (error) => {
          console.error(`Error ${action}ing user:`, error);
          if (error.status === 401) {
            alert('Unauthorized action. Please check your permissions.');
          } else if (error.status === 404) {
            alert('User not found. Please try again.');
          } else {
            alert(`Failed to ${action} user. Please try again later.`);
          }
        }
      );
    }
  }
}

