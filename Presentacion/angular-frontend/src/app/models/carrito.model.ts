// src/app/models/carrito.model.ts

export interface Carrito {
  id: number;
  idUsuario: string;      // GUID del usuario (ej: "3fa85f64-5717-4562-b3fc-2c963f66afa6")
  precioTotal: number;
  fechaActualizacion: Date;
}

export interface CarritoItem {
  id: number;
  idCarrito: number;
  idProducto: string;   // GUID
  cantidad: number;
  descripcion?: string;     // opcional si tu backend lo provee (lo tenías antes)
  precioUnitario?: number;  // opcional: a veces quieres usar el precio traído del microproducto
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
  producto?: Producto;   // opcional mientras se resuelve la consulta al microproducto
  subtotal?: number;     // opcional, calculado localmente (cantidad * producto.precio o precioUnitario)
}
