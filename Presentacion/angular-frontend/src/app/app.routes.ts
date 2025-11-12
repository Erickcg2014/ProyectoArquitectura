// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'JaveMarket - Your Product Catalog',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Iniciar Sesión - JaveMarket',
  },
  {
    path: 'auth/register-usuario',
    loadComponent: () =>
      import(
        './auth/register/register-usuario/register-usuario.component'
      ).then((m) => m.RegisterUsuarioComponent),
    title: 'Registro Usuario - JaveMarket',
  },
  {
    path: 'auth/register-proveedor',
    loadComponent: () =>
      import(
        './auth/register/register-proveedor/register-proveedor.component'
      ).then((m) => m.RegisterProveedorComponent),
    title: 'Registro Proveedor - JaveMarket',
  },
  {
    path: 'category/:slug',
    loadComponent: () =>
      import('./pages/category/category.component').then(
        (m) => m.CategoryComponent
      ),
    title: 'Categoría - JaveMarket',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    title: 'Product Details - JaveMarket',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'Shopping Cart - JaveMarket',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Dashboard - JaveMarket',
    // Aquí podrías agregar un guard de autenticación más adelante
    // canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
