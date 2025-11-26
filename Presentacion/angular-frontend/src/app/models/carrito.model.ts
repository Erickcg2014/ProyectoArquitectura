// src/app/models/carrito.model.ts

export interface Carrito {
  id: number;
  idUsuario: string;
  precioTotal: number;
  fechaActualizacion: Date;
}

export interface CarritoItem {
  id: number;
  idCarrito: number;
  idProducto: string;
  cantidad: number;
  descripcion?: string;
  precioUnitario?: number;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  cantidadDisponible: number;
  precio: number;
  categoria: number;
  imagenUrl: string;
  idProveedor?: string;
  cantidadReservada?: number;
}

export interface CarritoItemExtendido extends CarritoItem {
  producto?: Producto;
  subtotal?: number;
}
