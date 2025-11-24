import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/admin.service';
import { UserManagement } from '../../../models/admin.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: UserManagement[] = [];
  loading = true;
  selectedRole = 'all';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  getFilteredUsers(): UserManagement[] {
    if (this.selectedRole === 'all') {
      return this.users;
    }
    return this.users.filter(user => user.role === this.selectedRole);
  }

  getRoleColor(role: string): string {
    const colors: { [key: string]: string } = {
      'admin': 'bg-red-100 text-red-800',
      'provider': 'bg-blue-100 text-blue-800',
      'user': 'bg-green-100 text-green-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  getRoleText(role: string): string {
    const texts: { [key: string]: string } = {
      'admin': 'Administrador',
      'provider': 'Proveedor',
      'user': 'Usuario'
    };
    return texts[role] || role;
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'active': 'Activo',
      'inactive': 'Inactivo',
      'suspended': 'Suspendido'
    };
    return texts[status] || status;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  }

  updateUserStatus(userId: number, newStatus: string): void {
    this.adminService.updateUserStatus(userId, newStatus).subscribe({
      next: () => {
        // Update local data
        const user = this.users.find(u => u.id === userId);
        if (user) {
          user.status = newStatus as any;
        }
      },
      error: (error) => {
        console.error('Error updating user status:', error);
      }
    });
  }

  viewUserDetails(userId: number): void {
    // TODO: Navigate to user details
    console.log('View user details:', userId);
  }
}