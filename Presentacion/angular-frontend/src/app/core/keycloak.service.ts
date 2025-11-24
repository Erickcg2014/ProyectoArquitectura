import { Injectable } from '@angular/core';
import { KeycloakService as KeycloakAngularService } from 'keycloak-angular';
import { KeycloakInitOptions } from 'keycloak-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(private keycloak: KeycloakAngularService) {}

  async init(): Promise<boolean> {
    try {
      const config = {
        config: {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          checkLoginIframe: false,
          checkLoginIframeInterval: 0,
          pkceMethod: 'S256'
        } as KeycloakInitOptions
      };

      return await this.keycloak.init(config);
    } catch (error) {
      console.warn('Keycloak initialization failed, continuing without authentication:', error);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
    return this.keycloak.getUsername();
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  getUserRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

  hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }
}