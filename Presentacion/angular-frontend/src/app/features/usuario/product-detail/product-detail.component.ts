// src/app/pages/product-detail/product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  quantity: number = 1;
  loading: boolean = true;
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.productsService.getProductById(id).subscribe({
      next: (product: Product | undefined) => {
        if (product) {
          this.product = product;
          this.selectedImage = product.images?.[0] ?? '';
          this.loading = false;
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
        this.router.navigate(['/']);
      },
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getCents(): string {
    if (!this.product) return '00';
    const cents = Math.round((this.product.price % 1) * 100);
    return cents.toString().padStart(2, '0');
  }

  getDiscountPercentage(): number {
    if (!this.product || !this.product.originalPrice) return 0;
    return Math.round(
      ((this.product.originalPrice - this.product.price) /
        this.product.originalPrice) *
        100
    );
  }

  addToCart(): void {
    if (!this.product) return;

    console.log(`Adding ${this.quantity} x ${this.product.name} to cart`);
    alert(`¡${this.quantity} producto(s) agregado(s) al carrito!`);
  }

  buyNow(): void {
    if (!this.product) return;

    console.log(`Buying now: ${this.quantity} x ${this.product.name}`);
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  // Método auxiliar para verificar si es un producto físico
  isPhysicalProduct(): boolean {
    return this.product?.type === 'physical';
  }

  // Método auxiliar para verificar si hay descuento
  hasDiscount(): boolean {
    return (
      !!this.product?.originalPrice &&
      this.product.originalPrice > this.product.price
    );
  }
}
