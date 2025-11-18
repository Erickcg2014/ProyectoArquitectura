import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak | undefined;

  constructor() {}

  init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8082',
      realm: 'multichannel-realm',
      clientId: 'angular-frontend'
    });

    return this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false
    });
  }

  login(): void {
    this.keycloak?.login();
  }

  logout(): void {
    this.keycloak?.logout();
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  isAuthenticated(): boolean {
    return !!this.keycloak?.authenticated;
  }

  getUserProfile(): Promise<any> {
    return this.keycloak?.loadUserProfile() || Promise.resolve(null);
  }

  getRoles(): string[] {
    return this.keycloak?.realmAccess?.roles || [];
  }
}