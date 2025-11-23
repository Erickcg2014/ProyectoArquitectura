import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) {}

  // Método compatible con componentes existentes
  isAuthenticated(): boolean {
    try {
      return this.keycloakService.isLoggedIn();
    } catch {
      return false;
    }
  }

  // Alias para mantener compatibilidad
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  async getToken(): Promise<string | null> {
    try {
      if (this.isAuthenticated()) {
        return await this.keycloakService.getToken();
      }
    } catch {
      // KeycloakService no disponible aún
    }
    return null;
  }

  // Método de login compatible - redirige a Keycloak
  login(credentials?: any): Observable<any> {
    try {
      this.keycloakService.login();
      return of({ success: true });
    } catch (error) {
      return of({ success: false, error });
    }
  }

  // Método de registro - redirige a Keycloak
  registerUsuario(data?: any): Observable<any> {
    try {
      // Keycloak maneja el registro
      this.keycloakService.login();
      return of({ success: true });
    } catch (error) {
      return of({ success: false, error });
    }
  }

  // Método de registro proveedor - redirige a Keycloak
  registerProveedor(data?: any): Observable<any> {
    try {
      // Keycloak maneja el registro
      this.keycloakService.login();
      return of({ success: true });
    } catch (error) {
      return of({ success: false, error });
    }
  }

  // Método de logout
  logout(): void {
    this.keycloakService.logout();
  }

  // Obtener información del usuario
  getUsername(): string {
    try {
      return this.keycloakService.getUsername();
    } catch {
      return '';
    }
  }

  // Verificar roles
  hasRole(role: string): boolean {
    try {
      return this.keycloakService.hasRole(role);
    } catch {
      return false;
    }
  }
}
