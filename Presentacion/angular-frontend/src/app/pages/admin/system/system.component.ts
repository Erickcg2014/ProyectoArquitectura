import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/admin.service';
import { SystemConfig } from '../../../models/admin.model';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent implements OnInit {
  systemConfig: SystemConfig | null = null;
  loading = true;
  saving = false;
  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.configForm = this.fb.group({
      maintenanceMode: [false],
      registrationEnabled: [true],
      maxFileSize: [5242880, [Validators.required, Validators.min(1024)]],
      allowedFileTypes: [['jpg', 'jpeg', 'png', 'pdf']],
      smtpConfig: this.fb.group({
        host: ['', Validators.required],
        port: [587, [Validators.required, Validators.min(1), Validators.max(65535)]],
        username: ['', Validators.required],
        enabled: [true]
      }),
      paymentConfig: this.fb.group({
        gatewayUrl: ['', Validators.required],
        apiKey: ['', Validators.required],
        enabled: [true]
      })
    });
  }

  ngOnInit(): void {
    this.loadSystemConfig();
  }

  loadSystemConfig(): void {
    this.loading = true;
    this.adminService.getSystemConfig().subscribe({
      next: (config) => {
        this.systemConfig = config;
        this.configForm.patchValue(config);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading system config:', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      this.saving = true;
      const configData = this.configForm.value;

      this.adminService.updateSystemConfig(configData).subscribe({
        next: () => {
          this.systemConfig = configData;
          this.saving = false;
          // TODO: Show success message
        },
        error: (error) => {
          console.error('Error updating system config:', error);
          this.saving = false;
          // TODO: Show error message
        }
      });
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  addFileType(): void {
    const currentTypes = this.configForm.get('allowedFileTypes')?.value || [];
    currentTypes.push('');
    this.configForm.get('allowedFileTypes')?.setValue(currentTypes);
  }

  removeFileType(index: number): void {
    const currentTypes = this.configForm.get('allowedFileTypes')?.value || [];
    currentTypes.splice(index, 1);
    this.configForm.get('allowedFileTypes')?.setValue(currentTypes);
  }

  updateFileType(index: number, value: string): void {
    const currentTypes = this.configForm.get('allowedFileTypes')?.value || [];
    currentTypes[index] = value;
    this.configForm.get('allowedFileTypes')?.setValue(currentTypes);
  }

  testSmtpConnection(): void {
    // TODO: Implement SMTP test
    console.log('Testing SMTP connection...');
  }

  testPaymentGateway(): void {
    // TODO: Implement payment gateway test
    console.log('Testing payment gateway...');
  }
}