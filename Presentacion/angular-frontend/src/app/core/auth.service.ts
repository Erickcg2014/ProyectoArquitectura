// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private keycloakService: KeycloakService) {
    this.loadUserProfile();
  }

  private async loadUserProfile(): Promise<void> {
    if (await this.keycloakService.isLoggedIn()) {
      const profile = await this.keycloakService.loadUserProfile();
      const roles = this.keycloakService.getUserRoles();
      const userProfile: UserProfile = {
        id: profile.id || '',
        username: profile.username || '',
        email: profile.email || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        roles: roles,
      };
      this.currentUserSubject.next(userProfile);
    }
  }

  async login(): Promise<void> {
    await this.keycloakService.login({
      redirectUri: window.location.origin,
    });
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout(window.location.origin);
    this.currentUserSubject.next(null);
  }

  async register(): Promise<void> {
    await this.keycloakService.register({
      redirectUri: window.location.origin,
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  // Método para refrescar el token si es necesario
  async updateToken(): Promise<boolean> {
    try {
      return await this.keycloakService.updateToken(30);
    } catch (error) {
      console.error('Error updating token:', error);
      return false;
    }
  }
}
