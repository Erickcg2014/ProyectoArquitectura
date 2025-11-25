import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface RegisterUsuarioDto {
  username: string;
  password: string;
  email: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  barrio?: string;
  ciudad?: string;
  departamento?: string;
  pais: string;
  genero?: string;
  fecha_nacimiento?: string | null; // ← Permitir null
  idRol: number;
}

interface UsuarioResponse {
  id: string;
  keycloakId: string;
  username: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  pais: string;
  rolTipo?: string;
  activo: boolean;
  fechaCreacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiGatewayUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  register(userData: RegisterUsuarioDto): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/register`, userData);
  }

  getCurrentUser(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/me`);
  }

  getUserByKeycloakId(keycloakId: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(
      `${this.apiUrl}/keycloak/${keycloakId}`
    );
  }
}
