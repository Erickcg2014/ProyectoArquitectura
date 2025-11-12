// src/app/auth/register/register-proveedor/register-proveedor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-proveedor.component.html',
  styleUrls: ['./register-proveedor.component.css'],
})
export class RegisterProveedorComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  currentStep = 1;
  totalSteps = 3;

  // Ciudades principales de Colombia
  ciudades = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Bucaramanga',
    'Pereira',
    'Santa Marta',
    'Manizales',
    'Cúcuta',
    'Ibagué',
    'Pasto',
    'Villavicencio',
    'Otra',
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.registerForm = this.fb.group(
      {
        // Step 1: Información del Negocio
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        descripcion: [
          '',
          [
            Validators.required,
            Validators.minLength(20),
            Validators.maxLength(500),
          ],
        ],

        // Step 2: Información de Contacto
        email: [
          '',
          [Validators.required, Validators.email, this.emailDomainValidator],
        ],
        telefono: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        direccion: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200),
          ],
        ],
        ciudad: ['', [Validators.required]],

        // Step 3: Seguridad
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],

        // Términos y condiciones
        aceptaTerminos: [false, [Validators.requiredTrue]],
        aceptaPoliticasComerciales: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Validador personalizado para dominios de email
  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.includes('@')) {
      const domain = email.split('@')[1];
      const invalidDomains = [
        'tempmail.com',
        'throwaway.email',
        '10minutemail.com',
      ];
      if (invalidDomains.includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null;
  }

  // Validador de fortaleza de contraseña
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { weakPassword: true } : null;
  }

  // Validador para verificar que las contraseñas coincidan
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Getters para facilitar el acceso a los controles
  get nombre() {
    return this.registerForm.get('nombre');
  }
  get descripcion() {
    return this.registerForm.get('descripcion');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get telefono() {
    return this.registerForm.get('telefono');
  }
  get direccion() {
    return this.registerForm.get('direccion');
  }
  get ciudad() {
    return this.registerForm.get('ciudad');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get aceptaTerminos() {
    return this.registerForm.get('aceptaTerminos');
  }
  get aceptaPoliticasComerciales() {
    return this.registerForm.get('aceptaPoliticasComerciales');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Navegación entre pasos
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      if (this.validateCurrentStep()) {
        this.currentStep++;
      } else {
        this.markCurrentStepAsTouched();
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.nombre?.valid && this.descripcion?.valid);
      case 2:
        return !!(
          this.email?.valid &&
          this.telefono?.valid &&
          this.direccion?.valid &&
          this.ciudad?.valid
        );
      case 3:
        return !!(
          this.password?.valid &&
          this.confirmPassword?.valid &&
          !this.registerForm.errors?.['passwordMismatch'] &&
          this.aceptaTerminos?.valid &&
          this.aceptaPoliticasComerciales?.valid
        );
      default:
        return false;
    }
  }

  markCurrentStepAsTouched(): void {
    switch (this.currentStep) {
      case 1:
        this.nombre?.markAsTouched();
        this.descripcion?.markAsTouched();
        break;
      case 2:
        this.email?.markAsTouched();
        this.telefono?.markAsTouched();
        this.direccion?.markAsTouched();
        this.ciudad?.markAsTouched();
        break;
      case 3:
        this.password?.markAsTouched();
        this.confirmPassword?.markAsTouched();
        this.aceptaTerminos?.markAsTouched();
        this.aceptaPoliticasComerciales?.markAsTouched();
        break;
    }
  }

  // CONTRASEÑA FUNCIONES
  // Métodos para verificar requisitos de contraseña
  hasMinLength(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password && password.length >= 8;
  }

  hasUpperCase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password && /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password && /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password && /[0-9]/.test(password);
  }

  hasSpecialCharacter(): boolean {
    const password = this.registerForm.get('password')?.value;
    if (!password) return false;

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
  }

  // Calcular fortaleza de contraseña
  getPasswordStrength(): { strength: string; color: string; width: string } {
    const password = this.password?.value || '';
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2)
      return { strength: 'Débil', color: 'bg-red-500', width: '33%' };
    if (strength <= 3)
      return { strength: 'Media', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Fuerte', color: 'bg-green-500', width: '100%' };
  }

  // Contador de caracteres para descripción
  getDescripcionCount(): string {
    const count = this.descripcion?.value?.length || 0;
    return `${count}/500`;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const {
      confirmPassword,
      aceptaTerminos,
      aceptaPoliticasComerciales,
      ...proveedorData
    } = this.registerForm.value;

    // Agregar prefijo +57 al teléfono
    const telefonoCompleto = `+57${proveedorData.telefono}`;

    const registerData = {
      ...proveedorData,
      telefono: telefonoCompleto,
    };

    this.authService.registerProveedor(registerData).subscribe({
      next: (response) => {
        console.log('Registro de proveedor exitoso:', response);
        this.isLoading = false;
        this.successMessage =
          '¡Registro exitoso! Bienvenido a JaveMarket. Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en registro de proveedor:', error);
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          'Error al registrar proveedor. Por favor, intenta nuevamente.';

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      },
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
