// src/app/shared/product-card/product-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  Math = Math;

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('Adding to cart:', this.product.name);
  }

  getDiscount(): number {
    if (this.product.originalPrice) {
      return Math.round(
        ((this.product.originalPrice - this.product.price) /
          this.product.originalPrice) *
          100
      );
    }
    return 0;
  }

  getCents(): string {
    const cents = Math.round((this.product.price % 1) * 100);
    return cents.toString().padStart(2, '0');
  }
}
