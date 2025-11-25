// src/app/services/carrito.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import {
  Carrito,
  CarritoItem,
  CarritoItemExtendido,
  Producto,
} from '../../models/carrito.model';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = 'http://localhost:8087/api/Carrito';
  private apiProductoUrl = 'http://localhost:8083/api/Producto';

  constructor(private http: HttpClient) {}

  // ------------------------------
  //  MÉTODOS ORIGINALES (NO TOCAR)
  // ------------------------------

  crearCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.apiUrl}/crear/carrito`, carrito);
  }

  crearCarritoItem(item: CarritoItem): Observable<CarritoItem> {
    return this.http.post<CarritoItem>(`${this.apiUrl}/crear/Item`, item);
  }

  getCarritoItemById(id: number): Observable<CarritoItem> {
    return this.http.get<CarritoItem>(`${this.apiUrl}/${id}`);
  }

  getAllCarritoItemByIdCliente(idCliente: string): Observable<CarritoItem[]> {
    return this.http.get<CarritoItem[]>(`${this.apiUrl}/cliente/${idCliente}`);
  }

  deleteCarritoItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCantidad(id: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cantidad/${id}`, cantidad, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateDescripcion(id: number, descripcion: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/descripcion/${id}`,
      JSON.stringify(descripcion),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  updatePrecio(id: number, precio: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/precio/${id}`, precio, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteCarritoByCliente(idCliente: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cliente/${idCliente}`);
  }

  // ------------------------------
  //     NUEVAS FUNCIONES
  // ------------------------------

  // Obtener producto por ID desde microproductos
  getProductoById(idProducto: string): Observable<Producto> {
    return this.http.get<Producto>(
      `${this.apiProductoUrl}/buscarproducto/${idProducto}`
    );
  }

  // Extender items del carrito con sus productos y subtotal
  extenderItems(items: CarritoItem[]): Observable<CarritoItemExtendido[]> {
    const llamadas = items.map((item) =>
      this.getProductoById(item.idProducto).pipe(
        map((producto) => {
          // 🔥 Armar URL pública de Google Cloud Storage
          if (producto?.imagenUrl) {
            producto.imagenUrl = `https://storage.googleapis.com/${producto.imagenUrl}`;
          }

          return {
            ...item,
            producto,
            subtotal: producto.precio * item.cantidad,
          };
        })
      )
    );

    return forkJoin(llamadas);
  }
}
