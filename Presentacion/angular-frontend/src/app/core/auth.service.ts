// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private keycloakService: KeycloakService, private router: Router) {
    this.loadUserProfile();
  }

  private async loadUserProfile() {
    if (this.keycloakService.isAuthenticated()) {
      try {
        const profile = await this.keycloakService.getUserProfile();
        this.currentUserSubject.next(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  }

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  getToken(): string | undefined {
    return this.keycloakService.getToken();
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getRoles(): string[] {
    return this.keycloakService.getRoles();
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
}
