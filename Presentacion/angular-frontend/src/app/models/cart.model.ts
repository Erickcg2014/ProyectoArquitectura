export interface Carrito {
  id: number;
  idUsuario: number;
  precioTotal: number;
  fechaActualizacion: string;
}

export interface CarritoItem {
  id: number;
  idCarrito: number;
  idProducto: number;
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
}