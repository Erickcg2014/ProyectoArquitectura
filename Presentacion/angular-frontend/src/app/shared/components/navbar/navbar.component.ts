import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

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
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('categoriesButton', { read: ElementRef })
  categoriesButton!: ElementRef;

  cartItemCount = 0;
  isDropdownOpen = false;
  dropdownStyles: any = {};

  isAuthenticated = false;
  currentUser: any = null;
  userInitials = '';

  // ============================================
  // NUEVO: Subscription para limpiar después
  // ============================================
  private authSubscription?: Subscription;

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserInfo();

    // ============================================
    // NUEVO: Escuchar cambios de autenticación
    // ============================================
    this.authSubscription = this.authService.authStatus$.subscribe(() => {
      this.loadUserInfo();
    });
  }

  // ============================================
  // NUEVO: Limpiar subscripción al destruir
  // ============================================
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  loadUserInfo(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.currentUser = this.authService.getCurrentUser();

      if (this.currentUser?.nombre) {
        const names = this.currentUser.nombre.split(' ');
        this.userInitials =
          names.length >= 2
            ? `${names[0][0]}${names[1][0]}`.toUpperCase()
            : names[0].substring(0, 2).toUpperCase();
      }
    } else {
      // ============================================
      // NUEVO: Limpiar datos cuando no hay usuario
      // ============================================
      this.currentUser = null;
      this.userInitials = '';
    }
  }

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
  goToCarrito(): void {
    console.log('Click en carrito, isAuthenticated:', this.isAuthenticated);

    if (this.isAuthenticated) {
      // Cambia esta línea - usa la ruta correcta
      this.router.navigate(['/cart']);
    } else {
      // También actualiza el returnUrl
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/cart' },
      });
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

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Searching for:', input.value);
  }
}
