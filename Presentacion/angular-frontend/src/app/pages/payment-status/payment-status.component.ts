import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../../models/payment.model';
import { Order } from '../../models/order.model';
import { PaymentService } from '../../core/payment.service';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent implements OnInit {
  paymentId: string = '';
  payment: Payment | null = null;
  order: Order | null = null;
  loading = true;
  status: 'pending' | 'success' | 'failed' = 'pending';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.paymentId = this.route.snapshot.params['id'];
    if (this.paymentId) {
      this.checkPaymentStatus();
    }
  }

  checkPaymentStatus(): void {
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (payment) => {
        this.payment = payment;
        if (payment) {
          this.status = payment.status === 'aprobado' ? 'success' : payment.status === 'rechazado' ? 'failed' : 'pending';
          // Consultar orden
          this.orderService.getOrderById(parseInt(payment.orderId)).subscribe({
            next: (order) => {
              this.order = order;
              this.loading = false;
            },
            error: (error) => {
              console.error('Error loading order:', error);
              this.loading = false;
            }
          });
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading payment:', error);
        this.loading = false;
      }
    });
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}