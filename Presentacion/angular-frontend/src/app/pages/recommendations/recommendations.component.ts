import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { RecommendationService } from '../../core/recommendation.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {
  personalizedRecommendations: Product[] = [];
  trendingProducts: Product[] = [];
  loading = true;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.loading = true;
    const userId = 1; // TODO: Obtener del auth service

    // Cargar recomendaciones personalizadas
    this.recommendationService.getPersonalizedRecommendations(userId, 12).subscribe({
      next: (products) => {
        this.personalizedRecommendations = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading personalized recommendations:', error);
        this.loading = false;
      }
    });

    // Cargar productos trending
    this.recommendationService.getTrendingProducts().subscribe({
      next: (products) => {
        this.trendingProducts = products;
      },
      error: (error) => {
        console.error('Error loading trending products:', error);
      }
    });
  }
}