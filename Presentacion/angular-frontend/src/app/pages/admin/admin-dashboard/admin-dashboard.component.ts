import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminMetrics } from '../../../models/admin.model';
import { AdminService } from '../../../core/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  metrics: AdminMetrics | null = null;
  loading = true;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAdminMetrics();
  }

  loadAdminMetrics(): void {
    this.loading = true;
    this.adminService.getAdminMetrics().subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading admin metrics:', error);
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

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'user_registered': 'person_add',
      'order_created': 'shopping_cart',
      'product_added': 'inventory',
      'payment_processed': 'payment'
    };
    return icons[type] || 'info';
  }

  getActivityColor(type: string): string {
    const colors: { [key: string]: string } = {
      'user_registered': 'text-blue-600',
      'order_created': 'text-green-600',
      'product_added': 'text-purple-600',
      'payment_processed': 'text-yellow-600'
    };
    return colors[type] || 'text-gray-600';
  }

  goToUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  goToReports(): void {
    this.router.navigate(['/admin/reports']);
  }

  goToSystem(): void {
    this.router.navigate(['/admin/system']);
  }

  refreshData(): void {
    this.loadAdminMetrics();
  }
}
