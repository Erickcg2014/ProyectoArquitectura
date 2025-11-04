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
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
