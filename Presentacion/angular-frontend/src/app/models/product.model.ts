// src/app/models/product.model.ts

export enum ProductType {
  PHYSICAL = 'physical',
  SERVICE = 'service',
  DIGITAL = 'digital',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Para mostrar descuentos
  images: string[];
  category: string;
  categorySlug?: string;
  stock: number;
  type: ProductType;
  rating?: number;
  reviewCount?: number;
  vendor?: {
    id: string;
    name: string;
    logo?: string;
    rating?: number;
  };
  providerId?: number; // Para gestión de proveedores
  providerName?: string;
  inStock: boolean;
  featured?: boolean; // Para productos destacados
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  providerId: number;
}
