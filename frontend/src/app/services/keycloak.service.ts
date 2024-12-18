
// src/app/keycloak.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environment.dev';
// Import environment

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: any;
  private readonly keycloakConfig = {
    url: environment.KeyCloakDomain + '/auth',
    realm: environment.RealmName,
    clientId: environment.client_id,
  };
  public authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.keycloak = new Keycloak(this.keycloakConfig);
  }

  async init(): Promise<void> {
    try {
      await this.keycloak.init({ onLoad: 'login-required', checkLoginIframe: false });
      this.authenticated.next(this.keycloak.authenticated);
    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }

  getAccessToken(): string {
    return this.keycloak.token;
  }

  logout(): void {
    this.keycloak.logout();
  }
}
