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
import { AuthService } from '../../../core/services/auth.service';

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

  // Prefijos de país
  countryCodes = [
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+52', country: 'México', flag: '🇲🇽' },
    { code: '+34', country: 'España', flag: '🇪🇸' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+51', country: 'Perú', flag: '🇵🇪' },
  ];

  // Departamentos de Colombia
  departamentos = [
    'Amazonas',
    'Antioquia',
    'Arauca',
    'Atlántico',
    'Bolívar',
    'Boyacá',
    'Caldas',
    'Caquetá',
    'Casanare',
    'Cauca',
    'Cesar',
    'Chocó',
    'Córdoba',
    'Cundinamarca',
    'Guainía',
    'Guaviare',
    'Huila',
    'La Guajira',
    'Magdalena',
    'Meta',
    'Nariño',
    'Norte de Santander',
    'Putumayo',
    'Quindío',
    'Risaralda',
    'San Andrés y Providencia',
    'Santander',
    'Sucre',
    'Tolima',
    'Valle del Cauca',
    'Vaupés',
    'Vichada',
  ];

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
    'Montería',
    'Valledupar',
    'Neiva',
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
            Validators.maxLength(150),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z0-9_]+$/),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, this.emailDomainValidator],
        ],
        fecha_nacimiento: ['', [Validators.required, this.ageValidator]],
        genero: ['', [Validators.required]],

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
            Validators.maxLength(150),
          ],
        ],
        barrio: ['', [Validators.maxLength(100)]],
        ciudad: ['', [Validators.required]],
        departamento: ['', [Validators.required]],
        pais: ['Colombia', [Validators.required]],

        // Términos y condiciones
        aceptaTerminos: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Validador de edad (mayor de 18 años)
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18 ? null : { underAge: true };
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
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get fecha_nacimiento() {
    return this.registerForm.get('fecha_nacimiento');
  }
  get genero() {
    return this.registerForm.get('genero');
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
  get barrio() {
    return this.registerForm.get('barrio');
  }
  get ciudad() {
    return this.registerForm.get('ciudad');
  }
  get departamento() {
    return this.registerForm.get('departamento');
  }
  get pais() {
    return this.registerForm.get('pais');
  }
  get aceptaTerminos() {
    return this.registerForm.get('aceptaTerminos');
  }

  // Métodos para verificar requisitos de contraseña
  hasMinLength(): boolean {
    const password = this.password?.value;
    return password && password.length >= 8;
  }

  hasUpperCase(): boolean {
    const password = this.password?.value;
    return password && /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.password?.value;
    return password && /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.password?.value;
    return password && /[0-9]/.test(password);
  }

  hasSpecialCharacter(): boolean {
    const password = this.password?.value;
    return password && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
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
        return !!(
          this.nombre?.valid &&
          this.username?.valid &&
          this.email?.valid &&
          this.fecha_nacimiento?.valid &&
          this.genero?.valid
        );
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
          this.departamento?.valid &&
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
        this.username?.markAsTouched();
        this.email?.markAsTouched();
        this.fecha_nacimiento?.markAsTouched();
        this.genero?.markAsTouched();
        break;
      case 2:
        this.password?.markAsTouched();
        this.confirmPassword?.markAsTouched();
        break;
      case 3:
        this.telefono?.markAsTouched();
        this.direccion?.markAsTouched();
        this.barrio?.markAsTouched();
        this.ciudad?.markAsTouched();
        this.departamento?.markAsTouched();
        this.aceptaTerminos?.markAsTouched();
        break;
    }
  }

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

    // Formatear fecha de nacimiento a string ISO (YYYY-MM-DD)
    const fechaNacimientoFormatted = userData.fecha_nacimiento
      ? new Date(userData.fecha_nacimiento).toISOString().split('T')[0]
      : null;

    const registerData = {
      ...userData,
      telefono: telefonoCompleto,
      fecha_nacimiento: fechaNacimientoFormatted,
    };

    console.log('Datos a enviar:', registerData);

    this.authService.registerUsuario(registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.isLoading = false;
        this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
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

  getMaxDate(): string {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
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
