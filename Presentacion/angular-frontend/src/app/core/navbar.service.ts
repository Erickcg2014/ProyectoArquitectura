// src/app/core/navbar.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private hiddenRoutes = [
    '/login',
    '/auth/register-usuario',
    '/auth/register-proveedor',
  ];

  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    return !this.hiddenRoutes.some((route) => currentRoute.includes(route));
  }
}
