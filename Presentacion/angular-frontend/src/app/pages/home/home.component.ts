import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ← Agregar esta importación
import { Product } from '../../models/product.model';
import { ProductsService } from '../../core/product.service';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  technologyProducts: Product[] = [];
  newArrivals: Product[] = [];
  loading = true;

  constructor(
    private productsService: ProductsService,
    private router: Router // ← Inyectar Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    // Cargar productos de tecnología
    this.productsService.getProductsByCategory('Technology').subscribe({
      next: (products) => {
        this.technologyProducts = products;
      },
      error: (error) => {
        console.error('Error loading technology products:', error);
      },
    });

    // Cargar nuevos productos
    this.productsService.getProductsByCategory('New Arrivals').subscribe({
      next: (products) => {
        this.newArrivals = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading new arrivals:', error);
        this.loading = false;
      },
    });
  }

  // ← Agregar este método para navegar al login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
