// src/app/core/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AdminMetrics,
  UserManagement,
  SystemConfig,
  AdminReport
} from '../models/admin.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener métricas del dashboard admin
  getAdminMetrics(): Observable<AdminMetrics> {
    return this.http.get<AdminMetrics>(`${this.apiUrl}/api/admin/metrics`).pipe(
      catchError(() => of(this.getMockAdminMetrics()))
    );
  }

  // Gestión de usuarios
  getAllUsers(): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(`${this.apiUrl}/api/admin/users`).pipe(
      catchError(() => of(this.getMockUsers()))
    );
  }

  updateUserStatus(userId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/admin/users/${userId}/status`, { status }).pipe(
      catchError(() => of({}))
    );
  }

  // Configuración del sistema
  getSystemConfig(): Observable<SystemConfig> {
    return this.http.get<SystemConfig>(`${this.apiUrl}/api/admin/config`).pipe(
      catchError(() => of(this.getMockSystemConfig()))
    );
  }

  updateSystemConfig(config: SystemConfig): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/admin/config`, config).pipe(
      catchError(() => of({}))
    );
  }

  // Reportes
  generateReport(type: string, dateRange: any): Observable<AdminReport> {
    return this.http.post<AdminReport>(`${this.apiUrl}/api/admin/reports`, {
      type,
      dateRange
    }).pipe(
      catchError(() => of(this.getMockReport(type)))
    );
  }

  // Mock data para desarrollo
  private getMockAdminMetrics(): AdminMetrics {
    return {
      totalUsers: 1250,
      totalProviders: 45,
      totalProducts: 3200,
      totalOrders: 890,
      totalRevenue: 45000000,
      activeUsers: 890,
      newUsersToday: 12,
      pendingOrders: 23,
      systemHealth: 'healthy',
      recentActivities: [
        {
          id: 1,
          type: 'user_registered',
          description: 'Nuevo usuario registrado: Juan Pérez',
          timestamp: '2024-01-15T10:30:00Z',
          userId: 1251,
          userName: 'Juan Pérez'
        },
        {
          id: 2,
          type: 'order_created',
          description: 'Nueva orden #1001 por $150.000',
          timestamp: '2024-01-15T09:45:00Z'
        },
        {
          id: 3,
          type: 'product_added',
          description: 'Producto agregado: Laptop Gaming Pro',
          timestamp: '2024-01-15T08:20:00Z'
        }
      ],
      topProducts: [
        { productId: 1, name: 'UltraBook Pro', sales: 45, revenue: 6500000, providerName: 'TechCorp' },
        { productId: 2, name: 'NoiseGuard Headphones', sales: 38, revenue: 950000, providerName: 'AudioMax' },
        { productId: 3, name: 'Galaxy Phone S24', sales: 32, revenue: 16000000, providerName: 'MobileTech' }
      ],
      revenueByPeriod: [
        { period: '2024-01', revenue: 12000000, orders: 245, growth: 15.2 },
        { period: '2024-02', revenue: 13500000, orders: 267, growth: 12.5 },
        { period: '2024-03', revenue: 14200000, orders: 278, growth: 5.2 }
      ]
    };
  }

  private getMockUsers(): UserManagement[] {
    return [
      {
        id: 1,
        username: 'juanperez',
        email: 'juan@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-01-01',
        lastLogin: '2024-01-15',
        totalOrders: 5,
        totalSpent: 750000
      },
      {
        id: 2,
        username: 'techcorp',
        email: 'admin@techcorp.com',
        role: 'provider',
        status: 'active',
        createdAt: '2023-12-15',
        lastLogin: '2024-01-15',
        totalOrders: 150
      }
    ];
  }

  private getMockSystemConfig(): SystemConfig {
    return {
      maintenanceMode: false,
      registrationEnabled: true,
      maxFileSize: 5242880, // 5MB
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf'],
      smtpConfig: {
        host: 'smtp.gmail.com',
        port: 587,
        username: 'noreply@javemarket.com',
        enabled: true
      },
      paymentConfig: {
        gatewayUrl: 'https://api.paymentgateway.com',
        apiKey: 'pk_test_...',
        enabled: true
      }
    };
  }

  private getMockReport(type: string): AdminReport {
    return {
      id: 1,
      name: `Reporte de ${type}`,
      type: type as any,
      dateRange: {
        start: '2024-01-01',
        end: '2024-01-31'
      },
      data: [],
      generatedAt: new Date().toISOString(),
      generatedBy: 'Admin'
    };
  }
}