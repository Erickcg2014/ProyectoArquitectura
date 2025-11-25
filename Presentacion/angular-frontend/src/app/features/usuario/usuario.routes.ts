import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';

export const USUARIO_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, roleGuard(['user'])],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.default),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('./carrito/carrito.component').then((m) => m.default),
      },

      // ============================================
      // TODO: Implementar mi-perfil
      // ============================================
      // {
      //   path: 'perfil',
      //   loadComponent: () => import('./mi-perfil/mi-perfil.component'),
      // },

      // ============================================
      // TODO: Implementar mis-pedidos
      // ============================================
      // {
      //   path: 'pedidos',
      //   loadComponent: () => import('./mis-pedidos/mis-pedidos.component'),
      // },
    ],
  },
];
