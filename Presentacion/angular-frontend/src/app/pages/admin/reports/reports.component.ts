import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/admin.service';
import { AdminReport } from '../../../models/admin.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  reportForm: FormGroup;
  generating = false;
  currentReport: AdminReport | null = null;

  reportTypes = [
    { value: 'users', label: 'Reporte de Usuarios' },
    { value: 'orders', label: 'Reporte de Órdenes' },
    { value: 'revenue', label: 'Reporte de Ingresos' },
    { value: 'products', label: 'Reporte de Productos' }
  ];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.reportForm = this.fb.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.generating = true;
      const { type, startDate, endDate } = this.reportForm.value;

      const dateRange = {
        start: startDate,
        end: endDate
      };

      this.adminService.generateReport(type, dateRange).subscribe({
        next: (report) => {
          this.currentReport = report;
          this.generating = false;
        },
        error: (error) => {
          console.error('Error generating report:', error);
          this.generating = false;
        }
      });
    }
  }

  downloadReport(): void {
    if (this.currentReport) {
      // TODO: Implement actual download
      const dataStr = JSON.stringify(this.currentReport.data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

      const exportFileDefaultName = `${this.currentReport.name.replace(/\s+/g, '_')}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  }

  getReportTypeLabel(type: string): string {
    const reportType = this.reportTypes.find(rt => rt.value === type);
    return reportType ? reportType.label : type;
  }
}