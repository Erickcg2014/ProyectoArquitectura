import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Si ya está autenticado, redirigir
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;

        // ============================================
        // NUEVO: Verificar si hay returnUrl
        // ============================================
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];

        if (returnUrl) {
          // Si hay returnUrl, redirigir ahí directamente
          this.router.navigateByUrl(returnUrl);
        } else {
          // Si no hay returnUrl, redirigir según el rol
          const role = response.user.rolTipo?.toLowerCase();

          if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === 'provider') {
            this.router.navigate(['/proveedor/dashboard']);
          } else {
            this.router.navigate(['/usuario/home']);
          }
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;

        // Mensajes de error personalizados
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else if (error.status === 0) {
          this.errorMessage =
            'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else if (error.error?.error === 'invalid_grant') {
          this.errorMessage =
            'Credenciales inválidas. Verifica tu usuario y contraseña.';
        } else {
          this.errorMessage =
            error.error?.message ||
            'Error al iniciar sesión. Por favor, intenta nuevamente.';
        }

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      },
    });
  }

  onInputFocus(event: Event): void {
    const target = event.target as HTMLInputElement;
    target.style.border = '2px solid #2563EB';
    target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
  }

  onInputBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    target.style.border = '2px solid #BFDBFE';
    target.style.boxShadow = 'none';
  }
}
