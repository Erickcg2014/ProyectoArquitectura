import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { KeycloakService } from './keycloak.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  registerUsuario(userData: any): Observable<any> {
    const registerDto = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      nombre: userData.nombre,
      telefono: userData.telefono,
      direccion: userData.direccion,
      barrio: userData.barrio,
      ciudad: userData.ciudad,
      departamento: userData.departamento,
      pais: userData.pais || 'Colombia',
      genero: userData.genero,
      fecha_nacimiento: userData.fecha_nacimiento,
      idRol: 1,
    };

    return this.userService.register(registerDto);
  }

  registerProveedor(userData: any): Observable<any> {
    const registerDto = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      nombre: userData.nombre,
      telefono: userData.telefono,
      direccion: userData.direccion,
      barrio: userData.barrio,
      ciudad: userData.ciudad,
      departamento: userData.departamento,
      pais: userData.pais || 'Colombia',
      genero: 'No aplica',
      fecha_nacimiento: null,
      idRol: 2,
    };

    return this.userService.register(registerDto);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.apiGatewayUrl}/api/usuarios/login`, {
        username,
        password,
      })
      .pipe(
        tap((response: any) => {
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
          }
          if (response.refresh_token) {
            localStorage.setItem('refresh_token', response.refresh_token);
          }
          if (response.user) {
            localStorage.setItem('current_user', JSON.stringify(response.user));
          }

          this.authStatusSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');

    this.authStatusSubject.next(false);

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) return false;

      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch (error) {
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.rolTipo || null;
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }
}
