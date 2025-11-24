// src/app/core/cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrito, CarritoItem } from '../models/cart.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Crear carrito
  createCart(cart: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.apiUrl}/api/carrito/crear/carrito`, cart).pipe(
      catchError(() => of(cart)) // Fallback
    );
  }

  // Agregar item al carrito
  addItem(item: CarritoItem): Observable<CarritoItem> {
    return this.http.post<CarritoItem>(`${this.apiUrl}/api/carrito/crear/Item`, item).pipe(
      catchError(() => of(item))
    );
  }

  // Obtener items del carrito por cliente
  getCartItems(clientId: number): Observable<CarritoItem[]> {
    return this.http.get<CarritoItem[]>(`${this.apiUrl}/api/carrito/cliente/${clientId}`).pipe(
      catchError(() => of([]))
    );
  }

  // Actualizar cantidad de item
  updateItemQuantity(itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/carrito/cantidad/${itemId}`, quantity).pipe(
      catchError(() => of({}))
    );
  }

  // Eliminar item del carrito
  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/carrito/${itemId}`).pipe(
      catchError(() => of({}))
    );
  }

  // Limpiar carrito por cliente
  clearCart(clientId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/carrito/cliente/${clientId}`).pipe(
      catchError(() => of({}))
    );
  }
}