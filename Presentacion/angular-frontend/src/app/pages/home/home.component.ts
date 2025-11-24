import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../core/product.service';
import { RecommendationService } from '../../core/recommendation.service';
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
  recommendedProducts: Product[] = [];
  trendingProducts: Product[] = [];
  loading = true;

  // Banners promocionales
  banners = [
    {
      id: 1,
      title: '¡Oferta Especial!',
      subtitle: 'Hasta 50% de descuento en tecnología',
      image: 'https://via.placeholder.com/1200x400/1919e6/ffffff?text=Tecnologia+50%25',
      link: '/category/tecnologia'
    },
    {
      id: 2,
      title: 'Envío Gratis',
      subtitle: 'En compras superiores a $50.000',
      image: 'https://via.placeholder.com/1200x400/28a745/ffffff?text=Envio+Gratis',
      link: '/cart'
    },
    {
      id: 3,
      title: 'Nuevos Productos',
      subtitle: 'Descubre las últimas novedades',
      image: 'https://via.placeholder.com/1200x400/ff6b35/ffffff?text=Nuevos+Productos',
      link: '/category/nuevos'
    }
  ];

  constructor(
    private productsService: ProductsService,
    private recommendationService: RecommendationService,
    public router: Router
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
      },
      error: (error) => {
        console.error('Error loading new arrivals:', error);
      },
    });

    // Cargar recomendaciones personalizadas (si usuario logueado)
    const userId = 1; // TODO: Obtener del auth service
    this.recommendationService.getPersonalizedRecommendations(userId, 8).subscribe({
      next: (products) => {
        this.recommendedProducts = products;
      },
      error: (error) => {
        console.error('Error loading recommendations:', error);
      },
    });

    // Cargar productos trending
    this.recommendationService.getTrendingProducts().subscribe({
      next: (products) => {
        this.trendingProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trending products:', error);
        this.loading = false;
      },
    });
  }

  // ← Agregar este método para navegar al login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
