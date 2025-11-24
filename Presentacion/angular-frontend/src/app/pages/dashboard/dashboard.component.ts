import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardMetrics, SalesData } from '../../models/dashboard.model';
import { DashboardService } from '../../core/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  metrics: DashboardMetrics | null = null;
  salesData: SalesData[] = [];
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    const providerId = 1; // TODO: Obtener del auth service

    this.dashboardService.getDashboardMetrics(providerId).subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard metrics:', error);
        this.loading = false;
      }
    });

    this.dashboardService.getSalesData(providerId).subscribe({
      next: (data) => {
        this.salesData = data;
      },
      error: (error) => {
        console.error('Error loading sales data:', error);
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  }

  goToOrders(): void {
    this.router.navigate(['/dashboard/orders']);
  }

  goToProducts(): void {
    this.router.navigate(['/dashboard/products']);
  }

  goToAnalytics(): void {
    this.router.navigate(['/dashboard/analytics']);
  }
}
