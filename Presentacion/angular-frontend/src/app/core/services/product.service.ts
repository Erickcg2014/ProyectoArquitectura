// src/app/core/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductType } from '../../models/product.model';

// Interfaces del backend basadas en tu base de datos
export interface ProductoBackend {
  id: string; // UUID
  nombre: string;
  idProveedor: string; // UUID
  descripcion: string;
  precio: number;
  cantidadDisponible: number;
  cantidadReservada: number;
  imagenUrl: string; // ← Cambiado de imageUrl a imagenUrl
  idCategoria: number;
  categoria?: {
    id: number;
    nombre: string;
  };
}

export interface CategoriaBackend {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiGatewayUrl}/api/producto`;
  private gcsBaseUrl = 'https://storage.googleapis.com';

  constructor(private http: HttpClient) {}

  private mapProductoToProduct(producto: ProductoBackend): Product {
    const categorySlugMap: { [key: number]: string } = {
      1: 'supermercado',
      2: 'tecnologia',
      3: 'hogar',
      4: 'cocina',
      5: 'gaming',
      6: 'ropa',
      7: 'salud',
      8: 'deportes',
      9: 'farmacia',
      10: 'juguetes',
      11: 'motor',
      12: 'libros',
      13: 'construccion',
      14: 'servicios',
      15: 'bebes',
      16: 'mascotas',
    };

    const categoryNameMap: { [key: number]: string } = {
      1: 'Supermercado',
      2: 'Tecnología y Electrónica',
      3: 'Hogar, muebles y jardín',
      4: 'Cocina',
      5: 'Gaming',
      6: 'Ropa y accesorios',
      7: 'Salud y Belleza',
      8: 'Deportes y Fitness',
      9: 'Farmacia',
      10: 'Juegos y Juguetes',
      11: 'Motor y Vehículos',
      12: 'Libros, revistas y comics',
      13: 'Construcción e Industria',
      14: 'Servicios',
      15: 'Bebés',
      16: 'Mascotas',
    };

    const categorySlug = categorySlugMap[producto.idCategoria] || 'general';
    const categoryName = categoryNameMap[producto.idCategoria] || 'General';

    const totalStock = producto.cantidadDisponible + producto.cantidadReservada;

    const originalPrice = producto.precio * 1.1;

    const images = this.buildImageUrls(producto.imagenUrl);

    return {
      id: producto.id,
      name: producto.nombre,
      description: producto.descripcion || 'Sin descripción',
      price: producto.precio,
      originalPrice:
        originalPrice > producto.precio ? originalPrice : undefined,
      images: images,
      category: categoryName,
      categorySlug: categorySlug,
      stock: totalStock,
      type: ProductType.PHYSICAL,
      rating: this.generateRandomRating(),
      reviewCount: this.generateRandomReviewCount(),
      vendor: {
        id: producto.idProveedor,
        name: 'Proveedor',
        rating: 4.0,
      },
      inStock: totalStock > 0,
      featured: totalStock > 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private buildImageUrls(imagenUrl: string): string[] {
    if (!imagenUrl) {
      return ['https://via.placeholder.com/300'];
    }

    if (imagenUrl.startsWith('http')) {
      return [imagenUrl];
    }

    if (imagenUrl.includes('/')) {
      return [`${this.gcsBaseUrl}/${imagenUrl}`];
    }

    return [`${this.gcsBaseUrl}/javemarket_bucket/${imagenUrl}`];
  }

  private generateRandomRating(): number {
    return Math.random() * 2 + 3;
  }

  private generateRandomReviewCount(): number {
    return Math.floor(Math.random() * 100);
  }

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<ProductoBackend[]>(`${this.apiUrl}/obtenerproductos`)
      .pipe(
        map((productos) =>
          productos.map((producto) => this.mapProductoToProduct(producto))
        )
      );
  }

  // Obtener producto por ID
  getProductById(id: string): Observable<Product | undefined> {
    return this.http
      .get<ProductoBackend>(`${this.apiUrl}/buscarproducto/${id}`)
      .pipe(
        map((producto) =>
          producto ? this.mapProductoToProduct(producto) : undefined
        )
      );
  }

  // Obtener productos por ID de categoría
  getProductsByCategoryId(idCategoria: number): Observable<Product[]> {
    return this.http
      .get<ProductoBackend[]>(`${this.apiUrl}/categoriaId/${idCategoria}`)
      .pipe(
        map((productos) =>
          productos.map((producto) => this.mapProductoToProduct(producto))
        )
      );
  }

  // Obtener productos por nombre de categoría
  getProductsByCategoryName(nombreCategoria: string): Observable<Product[]> {
    return this.http
      .get<ProductoBackend[]>(`${this.apiUrl}/categoriaStr/${nombreCategoria}`)
      .pipe(
        map((productos) =>
          productos.map((producto) => this.mapProductoToProduct(producto))
        )
      );
  }

  // Obtener todas las categorías
  getAllCategories(): Observable<CategoriaBackend[]> {
    return this.http.get<CategoriaBackend[]>(`${this.apiUrl}/categorias`);
  }

  // Obtener precio de un producto
  getProductPrice(id: string): Observable<{ precio: number }> {
    return this.http.get<{ precio: number }>(`${this.apiUrl}/precio/${id}`);
  }

  // Verificar disponibilidad
  verificarDisponibilidad(
    id: string,
    cantidad: number
  ): Observable<{ disponible: boolean }> {
    return this.http.post<{ disponible: boolean }>(
      `${this.apiUrl}/verificar-disponibilidad/${id}?cantidad=${cantidad}`,
      {}
    );
  }
}
