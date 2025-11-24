import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/user.model';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = true;
  saving = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    const userId = 1; // TODO: Obtener del auth service

    this.userService.getUserProfile(userId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone || ''
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.profile) {
      this.saving = true;
      const updatedProfile = {
        ...this.profile,
        ...this.profileForm.value
      };

      this.userService.updateUserProfile(this.profile.id, updatedProfile).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.saving = false;
          // TODO: Mostrar mensaje de éxito
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.saving = false;
          // TODO: Mostrar mensaje de error
        }
      });
    }
  }

  goToAddresses(): void {
    this.router.navigate(['/profile/addresses']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }
}