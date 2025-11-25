import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css',
})
export class ProductCarouselComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() products: Product[] = [];
  @Input() showViewAll: boolean = false;
  @Input() viewAllRoute: string = '';

  currentIndex = 0;
  itemsPerView = 4;

  constructor(private router: Router) {}

  get visibleProducts(): Product[] {
    return this.products.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerView
    );
  }

  next(): void {
    if (this.currentIndex + this.itemsPerView < this.products.length) {
      this.currentIndex++;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  canNext(): boolean {
    return this.currentIndex + this.itemsPerView < this.products.length;
  }

  canPrev(): boolean {
    return this.currentIndex > 0;
  }

  goToProduct(productId: string): void {
    this.router.navigate(['/usuario/producto', productId]);
  }

  viewAll(): void {
    if (this.viewAllRoute) {
      this.router.navigate([this.viewAllRoute]);
    }
  }

  // Método para obtener el precio formateado
  getFormattedPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  // Método para verificar si tiene descuento
  hasDiscount(product: Product): boolean {
    return !!product.originalPrice && product.originalPrice > product.price;
  }

  // Método para calcular el porcentaje de descuento
  getDiscountPercentage(product: Product): number {
    if (!this.hasDiscount(product)) return 0;
    return Math.round(
      ((product.originalPrice! - product.price) / product.originalPrice!) * 100
    );
  }
}
