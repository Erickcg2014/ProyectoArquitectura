import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ProductService,
  ProductoBackend,
  CategoriaBackend,
} from '../../../core/services/product.service';
import { ProductCarouselComponent } from '../../../shared/components/product-carousel/product-carousel.component';
import { forkJoin } from 'rxjs';
import { Product } from '../../../models/product.model';

interface ProductsByCategory {
  categoria: string;
  productos: Product[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent implements OnInit {
  productsByCategory: ProductsByCategory[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProductsByCategories();
  }

  loadProductsByCategories(): void {
    this.loading = true;
    this.error = '';

    this.productService.getAllCategories().subscribe({
      next: (categorias: CategoriaBackend[]) => {
        if (categorias.length === 0) {
          this.loading = false;
          this.error = 'No hay categorías disponibles';
          return;
        }

        const requests = categorias.map((categoria: CategoriaBackend) =>
          this.productService.getProductsByCategoryId(categoria.id)
        );

        forkJoin(requests).subscribe({
          next: (results: Product[][]) => {
            this.productsByCategory = categorias
              .map((categoria: CategoriaBackend, index: number) => ({
                categoria: categoria.nombre,
                productos: results[index],
              }))
              .filter((item) => item.productos.length > 0);

            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar productos por categorías:', err);
            this.error = 'Error al cargar los productos';
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.error = 'Error al cargar las categorías';
        this.loading = false;
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToProduct(productId: string): void {
    this.router.navigate(['/usuario/producto', productId]);
  }
}
