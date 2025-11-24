import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddress } from '../../models/user.model';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent implements OnInit {
  addresses: UserAddress[] = [];
  loading = true;
  showForm = false;
  editingAddress: UserAddress | null = null;
  saving = false;

  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['Colombia', Validators.required],
      isDefault: [false]
    });
  }

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading = true;
    const userId = 1; // TODO: Obtener del auth service

    this.userService.getUserAddresses(userId).subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading addresses:', error);
        this.loading = false;
      }
    });
  }

  showAddForm(): void {
    this.editingAddress = null;
    this.addressForm.reset({ country: 'Colombia', isDefault: false });
    this.showForm = true;
  }

  editAddress(address: UserAddress): void {
    this.editingAddress = address;
    this.addressForm.patchValue(address);
    this.showForm = true;
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingAddress = null;
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.saving = true;
      const addressData = this.addressForm.value;
      addressData.userId = 1; // TODO: Obtener del auth service

      if (this.editingAddress) {
        // Update
        this.userService.updateAddress(this.editingAddress.id!, addressData).subscribe({
          next: () => {
            this.loadAddresses();
            this.cancelEdit();
            this.saving = false;
          },
          error: (error) => {
            console.error('Error updating address:', error);
            this.saving = false;
          }
        });
      } else {
        // Create
        this.userService.createAddress(addressData).subscribe({
          next: () => {
            this.loadAddresses();
            this.cancelEdit();
            this.saving = false;
          },
          error: (error) => {
            console.error('Error creating address:', error);
            this.saving = false;
          }
        });
      }
    }
  }

  deleteAddress(address: UserAddress): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
      this.userService.deleteAddress(address.id!).subscribe({
        next: () => {
          this.loadAddresses();
        },
        error: (error) => {
          console.error('Error deleting address:', error);
        }
      });
    }
  }
}