// src/app/pages/cart/cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Mock data - TODO: Conectar con CartService
    this.cartItems = [
      {
        id: '1',
        productId: '1',
        name: 'UltraBook Pro',
        price: 1299.99,
        quantity: 1,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAfaJA2IVAE6QKsooXSLFGTpTyOfHlIwoJ2kAxccBSOgkxxAOaHD4eCjHSfYr0Gc8fmphE7gxCWH-1OEsTWpHmmQ7M3VzMKwojgAbL6FLE03u_8tuujQipNsobg4ygyz0Y_iIcBbLOhDGm22A2bobfTIkUFA3jgiZczFw0VpYdHU7IYxh8o3pbmx961cHe2nquoz7dVI0TI8LimZkAN0DxLG-1A9FsMffXDS8azpm8Jg0cZqHFmKTjpVEI1TLusQ91NmdHDncDJXbk',
        stock: 15,
      },
      {
        id: '2',
        productId: '3',
        name: 'Galaxy Phone S24',
        price: 999.0,
        quantity: 2,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1TOCuhv3aB__m46QcTcGiWQqvChzhZJkA2igPNLc29xRYMFOjIqRRYIcQ6mrPqsDArV4_ksMoeYvhc8WQgq5Tg8dMrkzNwSrpL_TcSCQLXYnlxHICos7ev6X1ZVc8vUYK885S_qNJB4L-6ns0odBa4qVdYaamfDUujQIxYPsBxyPFpvaXibkJyVLtAbPwH3kqotav4PVzZTIZ2z3FleuElUbxLkaTPFGv00nIucRirypTvwXU48dgKMhpVGKgTbfzj21k9OPKmQ',
        stock: 42,
      },
    ];
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      item.quantity = newQuantity;
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getTax(): number {
    return this.getSubtotal() * 0.08; // 8% tax
  }

  getShipping(): number {
    return this.cartItems.length > 0 ? 0 : 0; // Free shipping
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax() + this.getShipping();
  }

  proceedToCheckout(): void {
    console.log('Proceeding to checkout...');
    alert('Checkout feature coming soon!');
    // TODO: Navigate to checkout
  }

  continueShopping(): void {
    console.log('Continue shopping...');
  }
}
