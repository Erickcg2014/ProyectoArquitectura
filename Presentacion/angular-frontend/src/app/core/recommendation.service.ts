// src/app/core/recommendation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Recommendation, RecommendationResponse } from '../models/recommendation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener recomendaciones para un usuario
  getRecommendationsForUser(userId: number): Observable<Product[]> {
    return this.http.get<RecommendationResponse>(`${this.apiUrl}/api/recomendaciones/usuario/${userId}`).pipe(
      map(response => response.products),
      catchError(() => {
        // Fallback: devolver productos destacados
        return of([]);
      })
    );
  }

  // Obtener recomendaciones basadas en un producto
  getSimilarProducts(productId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/recomendaciones/producto/${productId}/similares`).pipe(
      catchError(() => of([]))
    );
  }

  // Obtener productos trending
  getTrendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/recomendaciones/trending`).pipe(
      catchError(() => of([]))
    );
  }

  // Obtener recomendaciones personalizadas
  getPersonalizedRecommendations(userId: number, limit: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/recomendaciones/personalizadas/${userId}?limit=${limit}`).pipe(
      catchError(() => of([]))
    );
  }
}