// src/app/shared/navbar/navbar.component.ts

import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('categoriesButton', { read: ElementRef })
  categoriesButton!: ElementRef;
  constructor(private router: Router) {} // ← Inyectar Router

  cartItemCount = 0;
  isDropdownOpen = false;
  dropdownStyles: any = {};

  categories: Category[] = [
    {
      id: '1',
      name: 'Más Vendidos',
      icon: 'trending_up',
      slug: 'mas-vendidos',
    },
    {
      id: '2',
      name: 'Supermercado',
      icon: 'shopping_basket',
      slug: 'supermercado',
    },
    {
      id: '3',
      name: 'Tecnología y Electrónica',
      icon: 'devices',
      slug: 'tecnologia',
    },
    { id: '4', name: 'Hogar, Muebles y Jardín', icon: 'chair', slug: 'hogar' },
    { id: '5', name: 'Cocina', icon: 'kitchen', slug: 'cocina' },
    { id: '6', name: 'Gaming', icon: 'sports_esports', slug: 'gaming' },
    { id: '7', name: 'Ropa y Accesorios', icon: 'checkroom', slug: 'ropa' },
    { id: '8', name: 'Salud y Belleza', icon: 'face', slug: 'salud' },
    {
      id: '9',
      name: 'Deportes y Fitness',
      icon: 'fitness_center',
      slug: 'deportes',
    },
    { id: '10', name: 'Farmacia', icon: 'medication', slug: 'farmacia' },
    { id: '11', name: 'Juegos y Juguetes', icon: 'toys', slug: 'juguetes' },
    {
      id: '12',
      name: 'Motor y Vehículos',
      icon: 'directions_car',
      slug: 'motor',
    },
    {
      id: '13',
      name: 'Libros, Revistas y Comics',
      icon: 'menu_book',
      slug: 'libros',
    },
    {
      id: '14',
      name: 'Construcción e Industria',
      icon: 'construction',
      slug: 'construccion',
    },
    { id: '15', name: 'Servicios', icon: 'handyman', slug: 'servicios' },
    { id: '16', name: 'Bebés', icon: 'child_care', slug: 'bebes' },
    { id: '17', name: 'Mascotas', icon: 'pets', slug: 'mascotas' },
  ];

  openDropdown(): void {
    if (this.categoriesButton) {
      const buttonElement = this.categoriesButton.nativeElement;
      const rect = buttonElement.getBoundingClientRect();

      this.dropdownStyles = {
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        zIndex: 9999,
      };

      this.isDropdownOpen = true;
    }
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    }
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Searching for:', input.value);
  }
}
