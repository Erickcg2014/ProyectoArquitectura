// src/app/features/usuario/carrito/carrito.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito.service';
import { AuthService } from '../../../core/services/auth.service';
import { CarritoItemExtendido } from '../../../models/carrito.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export default class CarritoComponent implements OnInit {
  items: CarritoItemExtendido[] = [];
  loading: boolean = false;
  error: string = '';

  // ============================================
  // CAMBIO: Ya no es hardcoded
  // ============================================
  idCliente: string = '';
  precioTotal: number = 0;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService, // ← Inyectar AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    // ============================================
    // NUEVO: Obtener ID del usuario autenticado
    // ============================================
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !currentUser.id) {
      this.error = 'Usuario no autenticado';
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/usuario/carrito' },
      });
      return;
    }

    this.idCliente = currentUser.id; // ← Usar el ID de la BD (no keycloakId)
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.loading = true;
    this.error = '';

    this.carritoService.getAllCarritoItemByIdCliente(this.idCliente).subscribe({
      next: (items) => {
        this.carritoService.extenderItems(items).subscribe({
          next: (itemsExtendidos) => {
            this.items = itemsExtendidos;
            this.calcularTotal();
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.error = 'Error al obtener información de productos';
            this.loading = false;
          },
        });
      },
      error: (err) => {
        this.error = 'Error al cargar el carrito';
        console.error(err);
        this.loading = false;
      },
    });
  }

  calcularTotal(): void {
    this.precioTotal = this.items.reduce(
      (sum, item) => sum + item.subtotal!,
      0
    );
  }

  aumentarCantidad(item: CarritoItemExtendido): void {
    const nuevaCantidad = item.cantidad + 1;
    this.actualizarCantidad(item, nuevaCantidad);
  }

  disminuirCantidad(item: CarritoItemExtendido): void {
    if (item.cantidad > 1) {
      const nuevaCantidad = item.cantidad - 1;
      this.actualizarCantidad(item, nuevaCantidad);
    }
  }

  actualizarCantidad(item: CarritoItemExtendido, nuevaCantidad: number): void {
    this.carritoService.updateCantidad(item.id, nuevaCantidad).subscribe({
      next: () => {
        item.cantidad = nuevaCantidad;
        item.subtotal = nuevaCantidad * item.producto!.precio;
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Error al actualizar cantidad', err);
        alert('Error al actualizar la cantidad');
      },
    });
  }

  eliminarItem(item: CarritoItemExtendido): void {
    if (confirm('¿Estás seguro de eliminar este producto del carrito?')) {
      this.carritoService.deleteCarritoItem(item.id).subscribe({
        next: () => {
          this.items = this.items.filter((i) => i.id !== item.id);
          this.calcularTotal();
        },
        error: (err) => {
          console.error('Error al eliminar item', err);
          alert('Error al eliminar el producto');
        },
      });
    }
  }

  vaciarCarrito(): void {
    if (confirm('¿Estás seguro de vaciar todo el carrito?')) {
      this.carritoService.deleteCarritoByCliente(this.idCliente).subscribe({
        next: () => {
          this.items = [];
          this.precioTotal = 0;
        },
        error: (err) => {
          console.error('Error al vaciar carrito', err);
          alert('Error al vaciar el carrito');
        },
      });
    }
  }

  procederAlPago(): void {
    if (this.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    alert('Procediendo al pago...');
  }
}
