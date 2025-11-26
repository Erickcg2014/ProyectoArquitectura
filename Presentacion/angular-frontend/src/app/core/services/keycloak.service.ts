import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloakUrl = environment.keycloakUrl;
  private realm = environment.keycloakRealm;
  private clientId = environment.keycloakClientId;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<KeycloakTokenResponse> {
    const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', this.clientId);
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<KeycloakTokenResponse>(url, body.toString(), { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          const expiresAt = Date.now() + response.expires_in * 1000;
          localStorage.setItem('expires_at', expiresAt.toString());
        })
      );
  }

  refreshToken(): Observable<KeycloakTokenResponse> {
    const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', this.clientId);
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<KeycloakTokenResponse>(url, body.toString(), { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          const expiresAt = Date.now() + response.expires_in * 1000;
          localStorage.setItem('expires_at', expiresAt.toString());
        })
      );
  }

  // Logout
  logout(): Observable<void> {
    const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/logout`;
    const refreshToken = localStorage.getItem('refresh_token');

    const body = new URLSearchParams();
    body.set('client_id', this.clientId);
    body.set('refresh_token', refreshToken || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<void>(url, body.toString(), { headers }).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_at');
      })
    );
  }

  // Obtener token actual
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Verificar si el token está expirado
  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('expires_at');
    if (!expiresAt) return true;

    return Date.now() >= parseInt(expiresAt);
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  // Obtener información del usuario desde el token
  getUserInfo(): any {
    const token = this.getAccessToken();
    if (!token) return null;

    return this.decodeToken(token);
  }
}
