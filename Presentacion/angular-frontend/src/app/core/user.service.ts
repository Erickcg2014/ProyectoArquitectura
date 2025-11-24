// src/app/core/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfile, UserAddress } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener perfil del usuario
  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/api/usuario/${userId}`).pipe(
      catchError(() => of({
        id: userId,
        username: 'usuario',
        email: 'usuario@example.com',
        firstName: 'Usuario',
        lastName: 'Ejemplo',
        roles: ['user']
      } as UserProfile))
    );
  }

  // Actualizar perfil del usuario
  updateUserProfile(userId: number, profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/api/usuario/${userId}`, profile).pipe(
      catchError(() => of(profile as UserProfile))
    );
  }

  // Obtener direcciones del usuario
  getUserAddresses(userId: number): Observable<UserAddress[]> {
    return this.http.get<UserAddress[]>(`${this.apiUrl}/api/usuario/${userId}/direcciones`).pipe(
      catchError(() => of([]))
    );
  }

  // Crear dirección
  createAddress(address: UserAddress): Observable<UserAddress> {
    return this.http.post<UserAddress>(`${this.apiUrl}/api/usuario/direcciones`, address).pipe(
      catchError(() => of(address))
    );
  }

  // Actualizar dirección
  updateAddress(addressId: number, address: UserAddress): Observable<UserAddress> {
    return this.http.put<UserAddress>(`${this.apiUrl}/api/usuario/direcciones/${addressId}`, address).pipe(
      catchError(() => of(address))
    );
  }

  // Eliminar dirección
  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/usuario/direcciones/${addressId}`).pipe(
      catchError(() => of({}))
    );
  }
}