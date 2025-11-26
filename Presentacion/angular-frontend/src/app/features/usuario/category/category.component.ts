// src/app/pages/category/category.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductType } from '../../../models/product.model'; // Importar ProductType
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

interface CategoryInfo {
  name: string;
  icon: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categorySlug: string = '';
  categoryInfo: CategoryInfo | null = null;
  products: Product[] = [];
  loading: boolean = true;

  private categoriesData: { [key: string]: CategoryInfo } = {
    'mas-vendidos': {
      name: 'Más Vendidos',
      icon: 'trending_up',
      description: 'Los productos más populares de nuestra tienda',
      image:
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    },
    supermercado: {
      name: 'Supermercado',
      icon: 'shopping_basket',
      description: 'Productos de alimentación y bebidas',
      image:
        'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200',
    },
    tecnologia: {
      name: 'Tecnología y Electrónica',
      icon: 'devices',
      description: 'Lo último en tecnología y gadgets',
      image:
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
    },
    hogar: {
      name: 'Hogar, Muebles y Jardín',
      icon: 'chair',
      description: 'Todo para tu hogar y jardín',
      image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200',
    },
    cocina: {
      name: 'Cocina',
      icon: 'kitchen',
      description: 'Electrodomésticos y utensilios de cocina',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
    },
    gaming: {
      name: 'Gaming',
      icon: 'sports_esports',
      description: 'Consolas, juegos y accesorios gaming',
      image:
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200',
    },
    ropa: {
      name: 'Ropa y Accesorios',
      icon: 'checkroom',
      description: 'Moda y complementos para todos',
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
    },
    salud: {
      name: 'Salud y Belleza',
      icon: 'face',
      description: 'Cuidado personal y productos de belleza',
      image:
        'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200',
    },
    deportes: {
      name: 'Deportes y Fitness',
      icon: 'fitness_center',
      description: 'Equipamiento deportivo y fitness',
      image:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200',
    },
    farmacia: {
      name: 'Farmacia',
      icon: 'medication',
      description: 'Productos farmacéuticos y salud',
      image:
        'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200',
    },
    juguetes: {
      name: 'Juegos y Juguetes',
      icon: 'toys',
      description: 'Diversión para todas las edades',
      image:
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1200',
    },
    motor: {
      name: 'Motor y Vehículos',
      icon: 'directions_car',
      description: 'Accesorios y repuestos para vehículos',
      image:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
    },
    libros: {
      name: 'Libros, Revistas y Comics',
      icon: 'menu_book',
      description: 'Lectura y entretenimiento',
      image:
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200',
    },
    construccion: {
      name: 'Construcción e Industria',
      icon: 'construction',
      description: 'Herramientas y materiales profesionales',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200',
    },
    servicios: {
      name: 'Servicios',
      icon: 'handyman',
      description: 'Servicios profesionales a tu alcance',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
    },
    bebes: {
      name: 'Bebés',
      icon: 'child_care',
      description: 'Todo para el cuidado de tu bebé',
      image:
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200',
    },
    mascotas: {
      name: 'Mascotas',
      icon: 'pets',
      description: 'Productos para tus mejores amigos',
      image:
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categorySlug = params['slug'];
      this.loadCategory();
    });
  }

  loadCategory(): void {
    this.loading = true;

    this.categoryInfo = this.categoriesData[this.categorySlug] || null;

    this.productsService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products.filter(
          (p) => p.categorySlug === this.categorySlug
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
        this.products = [];
      },
    });
  }
}
