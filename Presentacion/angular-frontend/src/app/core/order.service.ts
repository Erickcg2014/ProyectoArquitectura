// src/app/core/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Crear orden
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/api/orden`, order).pipe(
      catchError(() => of(order))
    );
  }

  // Obtener órdenes por usuario
  getOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/api/orden/usuario/${userId}`).pipe(
      catchError(() => of([]))
    );
  }

  // Obtener orden por ID
  getOrderById(orderId: number): Observable<Order | null> {
    return this.http.get<Order>(`${this.apiUrl}/api/orden/${orderId}`).pipe(
      catchError(() => of(null))
    );
  }
}