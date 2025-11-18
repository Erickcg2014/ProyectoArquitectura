// src/app/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Si ya está autenticado, redirigir al dashboard
    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onLogin(): Promise<void> {
    this.isLoading = true;
    try {
      await this.authService.login();
      // El redirect se maneja automáticamente por Keycloak
    } catch (error) {
      console.error('Error en login:', error);
      this.isLoading = false;
    }
  }

  async onRegister(): Promise<void> {
    try {
      await this.authService.register();
      // El redirect se maneja automáticamente por Keycloak
    } catch (error) {
      console.error('Error en registro:', error);
    }
  }
}
