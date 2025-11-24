import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderOrderSummary } from '../../../models/provider.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: ProviderOrderSummary[] = [];
  loading = true;
  selectedStatus = 'all';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    // TODO: Implement API call to get provider orders
    // Mock data for now
    this.orders = [
      {
        id: 1,
        orderId: 1001,
        customerName: 'Juan Pérez',
        total: 150000,
        status: 'pending',
        date: '2024-01-15',
        itemCount: 2
      },
      {
        id: 2,
        orderId: 1002,
        customerName: 'María García',
        total: 250000,
        status: 'confirmed',
        date: '2024-01-14',
        itemCount: 3
      },
      {
        id: 3,
        orderId: 1003,
        customerName: 'Carlos López',
        total: 89000,
        status: 'shipped',
        date: '2024-01-13',
        itemCount: 1
      }
    ];
    this.loading = false;
  }

  getFilteredOrders(): ProviderOrderSummary[] {
    if (this.selectedStatus === 'all') {
      return this.orders;
    }
    return this.orders.filter(order => order.status === this.selectedStatus);
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

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmado',
      'shipped': 'Enviado',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return texts[status] || status;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    // TODO: Implement API call to update order status
    console.log(`Updating order ${orderId} to status ${newStatus}`);
    // Update local data
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
    }
  }

  viewOrderDetail(orderId: number): void {
    this.router.navigate(['/dashboard/orders', orderId]);
  }
}