// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home - JaveMarket',
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
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Dashboard Proveedor - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/products',
    loadComponent: () =>
      import('./pages/dashboard/products/products.component').then(
        (m) => m.ProductsComponent
      ),
    title: 'Mis Productos - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/orders',
    loadComponent: () =>
      import('./pages/dashboard/orders/orders.component').then(
        (m) => m.OrdersComponent
      ),
    title: 'Mis Órdenes - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/analytics',
    loadComponent: () =>
      import('./pages/dashboard/analytics/analytics.component').then(
        (m) => m.AnalyticsComponent
      ),
    title: 'Analytics - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    title: 'Panel de Administración - JaveMarket',
    canActivate: [AuthGuard] // TODO: Add admin role guard
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./pages/admin/users/users.component').then(
        (m) => m.UsersComponent
      ),
    title: 'Gestión de Usuarios - JaveMarket',
    canActivate: [AuthGuard] // TODO: Add admin role guard
  },
  {
    path: 'admin/system',
    loadComponent: () =>
      import('./pages/admin/system/system.component').then(
        (m) => m.SystemComponent
      ),
    title: 'Configuración del Sistema - JaveMarket',
    canActivate: [AuthGuard] // TODO: Add admin role guard
  },
  {
    path: 'admin/reports',
    loadComponent: () =>
      import('./pages/admin/reports/reports.component').then(
        (m) => m.ReportsComponent
      ),
    title: 'Reportes Administrativos - JaveMarket',
    canActivate: [AuthGuard] // TODO: Add admin role guard
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
    title: 'Buscar - JaveMarket',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'payment/status/:id',
    loadComponent: () =>
      import('./pages/payment-status/payment-status.component').then((m) => m.PaymentStatusComponent),
    title: 'Estado del Pago - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.component').then((m) => m.OrdersComponent),
    title: 'Mis Órdenes - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./pages/order-detail/order-detail.component').then((m) => m.OrderDetailComponent),
    title: 'Detalle de Orden - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Mi Perfil - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/addresses',
    loadComponent: () =>
      import('./pages/addresses/addresses.component').then((m) => m.AddressesComponent),
    title: 'Mis Direcciones - JaveMarket',
    canActivate: [AuthGuard]
  },
  {
    path: 'recommendations',
    loadComponent: () =>
      import('./pages/recommendations/recommendations.component').then((m) => m.RecommendationsComponent),
    title: 'Recomendaciones - JaveMarket',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
