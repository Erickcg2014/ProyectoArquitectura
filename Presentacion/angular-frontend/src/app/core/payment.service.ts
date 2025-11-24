// src/app/core/payment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from '../models/payment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Iniciar pago
  initiatePayment(orderId: string, amount: number, method: string): Observable<Payment> {
    const payload = { orderId, amount, method };
    return this.http.post<Payment>(`${this.apiUrl}/api/pago/iniciar`, payload).pipe(
      catchError(() => of({ orderId, amount, method, status: 'pending' } as Payment))
    );
  }

  // Obtener pago por ID
  getPaymentById(paymentId: string): Observable<Payment | null> {
    return this.http.get<Payment>(`${this.apiUrl}/api/pago/${paymentId}`).pipe(
      catchError(() => of(null))
    );
  }
}