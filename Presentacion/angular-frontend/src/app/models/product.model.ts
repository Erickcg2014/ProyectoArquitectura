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
  originalPrice?: number;
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
  inStock: boolean;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoriaBackend {
  id: number;
  nombre: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}
