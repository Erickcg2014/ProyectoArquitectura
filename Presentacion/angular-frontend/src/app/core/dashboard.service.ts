// src/app/core/dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardMetrics, SalesData, ProductAnalytics } from '../models/dashboard.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener métricas del dashboard para un proveedor
  getDashboardMetrics(providerId: number): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/api/dashboard/proveedor/${providerId}`).pipe(
      catchError(() => of(this.getMockMetrics()))
    );
  }

  // Obtener datos de ventas por período
  getSalesData(providerId: number, period: string = 'month'): Observable<SalesData[]> {
    return this.http.get<SalesData[]>(`${this.apiUrl}/api/dashboard/ventas/${providerId}?period=${period}`).pipe(
      catchError(() => of(this.getMockSalesData()))
    );
  }

  // Obtener analytics de productos
  getProductAnalytics(providerId: number): Observable<ProductAnalytics[]> {
    return this.http.get<ProductAnalytics[]>(`${this.apiUrl}/api/dashboard/productos/${providerId}/analytics`).pipe(
      catchError(() => of([]))
    );
  }

  // Mock data para desarrollo
  private getMockMetrics(): DashboardMetrics {
    return {
      totalSales: 1250,
      totalOrders: 89,
      totalProducts: 45,
      totalRevenue: 2850000,
      monthlyGrowth: 12.5,
      pendingOrders: 5,
      lowStockProducts: 3,
      recentOrders: [
        { id: 1, customerName: 'Juan Pérez', total: 150000, status: 'confirmed', date: '2024-01-15' },
        { id: 2, customerName: 'María García', total: 250000, status: 'shipped', date: '2024-01-14' },
        { id: 3, customerName: 'Carlos López', total: 89000, status: 'pending', date: '2024-01-13' }
      ],
      salesByCategory: [
        { category: 'Tecnología', sales: 450, percentage: 35 },
        { category: 'Hogar', sales: 320, percentage: 25 },
        { category: 'Ropa', sales: 280, percentage: 22 },
        { category: 'Otros', sales: 200, percentage: 18 }
      ],
      revenueChart: [
        { label: 'Ene', value: 1200000 },
        { label: 'Feb', value: 1350000 },
        { label: 'Mar', value: 1420000 },
        { label: 'Abr', value: 1580000 },
        { label: 'May', value: 1650000 },
        { label: 'Jun', value: 1720000 }
      ]
    };
  }

  private getMockSalesData(): SalesData[] {
    return [
      { period: '2024-01', revenue: 1200000, orders: 45, growth: 8.5 },
      { period: '2024-02', revenue: 1350000, orders: 52, growth: 12.5 },
      { period: '2024-03', revenue: 1420000, orders: 48, growth: 5.2 },
      { period: '2024-04', revenue: 1580000, orders: 61, growth: 11.3 },
      { period: '2024-05', revenue: 1650000, orders: 58, growth: 4.4 },
      { period: '2024-06', revenue: 1720000, orders: 63, growth: 4.2 }
    ];
  }
}