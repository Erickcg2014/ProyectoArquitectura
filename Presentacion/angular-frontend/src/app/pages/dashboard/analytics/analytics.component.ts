import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/dashboard.service';
import { SalesData, ProductAnalytics } from '../../../models/dashboard.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  salesData: SalesData[] = [];
  productAnalytics: ProductAnalytics[] = [];
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    const providerId = 1; // TODO: Get from auth

    this.dashboardService.getSalesData(providerId).subscribe({
      next: (data) => {
        this.salesData = data;
      },
      error: (error) => {
        console.error('Error loading sales data:', error);
      }
    });

    this.dashboardService.getProductAnalytics(providerId).subscribe({
      next: (analytics) => {
        this.productAnalytics = analytics;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product analytics:', error);
        this.loading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  getTotalRevenue(): number {
    return this.salesData.reduce((sum, data) => sum + data.revenue, 0);
  }

  getTotalOrders(): number {
    return this.salesData.reduce((sum, data) => sum + data.orders, 0);
  }

  getAverageOrderValue(): number {
    const totalRevenue = this.getTotalRevenue();
    const totalOrders = this.getTotalOrders();
    return totalOrders > 0 ? totalRevenue / totalOrders : 0;
  }

  getRevenuePercentage(data: SalesData): number {
    const maxRevenue = Math.max(...this.salesData.map(d => d.revenue));
    return maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
  }

  getSalesPercentage(product: ProductAnalytics): number {
    const maxSales = Math.max(...this.productAnalytics.map(p => p.sales));
    return maxSales > 0 ? (product.sales / maxSales) * 100 : 0;
  }
}