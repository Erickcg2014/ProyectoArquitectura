// src/app/auth/register/register-usuario/register-usuario.component.ts
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
  selector: 'app-register-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-usuario.component.html',
  styleUrls: ['./register-usuario.component.css'],
})
export class RegisterUsuarioComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  currentStep = 1;
  totalSteps = 3;

  // Prefijos de país para el selector
  countryCodes = [
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+52', country: 'México', flag: '🇲🇽' },
    { code: '+34', country: 'España', flag: '🇪🇸' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+51', country: 'Perú', flag: '🇵🇪' },
  ];

  // Ciudades principales de Colombia (puedes expandir esto)
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
        // Step 1: Información Personal
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        edad: [
          '',
          [Validators.required, Validators.min(18), Validators.max(120)],
        ],
        email: [
          '',
          [Validators.required, Validators.email, this.emailDomainValidator],
        ],

        // Step 2: Seguridad
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],

        // Step 3: Contacto y Ubicación
        countryCode: ['+57', [Validators.required]],
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

        // Términos y condiciones
        aceptaTerminos: [false, [Validators.requiredTrue]],
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
  hasSpecialCharacter(): boolean {
    const password = this.registerForm.get('password')?.value;
    if (!password) return false;

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
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
  get edad() {
    return this.registerForm.get('edad');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get countryCode() {
    return this.registerForm.get('countryCode');
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
  get aceptaTerminos() {
    return this.registerForm.get('aceptaTerminos');
  }

  // COMPONENTES CONTRASEÑA

  // Métodos para verificar requisitos de contraseña
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

  onConfirmPasswordBlur(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (
      (this.confirmPassword?.invalid ||
        this.registerForm.errors?.['passwordMismatch']) &&
      this.confirmPassword?.touched
    ) {
      target.style.border = '2px solid #EF4444';
    } else if (
      this.confirmPassword?.valid &&
      !this.registerForm.errors?.['passwordMismatch'] &&
      this.confirmPassword?.value
    ) {
      target.style.border = '2px solid #10B981';
    } else {
      target.style.border = '2px solid #BFDBFE';
    }

    target.style.boxShadow = 'none';
  }

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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Navegación entre pasos
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      // Validar campos del paso actual antes de avanzar
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
        return !!(this.nombre?.valid && this.edad?.valid && this.email?.valid);
      case 2:
        return !!(
          this.password?.valid &&
          this.confirmPassword?.valid &&
          !this.registerForm.errors?.['passwordMismatch']
        );
      case 3:
        return !!(
          this.telefono?.valid &&
          this.direccion?.valid &&
          this.ciudad?.valid &&
          this.aceptaTerminos?.valid
        );
      default:
        return false;
    }
  }

  markCurrentStepAsTouched(): void {
    switch (this.currentStep) {
      case 1:
        this.nombre?.markAsTouched();
        this.edad?.markAsTouched();
        this.email?.markAsTouched();
        break;
      case 2:
        this.password?.markAsTouched();
        this.confirmPassword?.markAsTouched();
        break;
      case 3:
        this.telefono?.markAsTouched();
        this.direccion?.markAsTouched();
        this.ciudad?.markAsTouched();
        this.aceptaTerminos?.markAsTouched();
        break;
    }
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

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { confirmPassword, countryCode, aceptaTerminos, ...userData } =
      this.registerForm.value;

    // Combinar código de país con teléfono
    const telefonoCompleto = `${countryCode}${userData.telefono}`;

    const registerData = {
      ...userData,
      telefono: telefonoCompleto,
    };

    this.authService.registerUsuario(registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.isLoading = false;
        this.successMessage = '¡Registro exitoso! Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          'Error al registrar usuario. Por favor, intenta nuevamente.';

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
