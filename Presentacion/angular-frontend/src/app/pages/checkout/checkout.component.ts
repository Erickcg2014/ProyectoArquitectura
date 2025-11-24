import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoItem } from '../../models/cart.model';
import { UserAddress, PaymentMethod, CheckoutData } from '../../models/checkout.model';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';
import { PaymentService } from '../../core/payment.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  currentStep = 1;
  cartItems: CarritoItem[] = [];
  total = 0;
  loading = false;

  addressForm: FormGroup;
  paymentForm: FormGroup;

  paymentMethods: PaymentMethod[] = [
    { id: 'credit_card', type: 'credit_card', name: 'Tarjeta de Crédito' },
    { id: 'debit_card', type: 'debit_card', name: 'Tarjeta de Débito' },
    { id: 'paypal', type: 'paypal', name: 'PayPal' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['Colombia', Validators.required]
    });

    this.paymentForm = this.fb.group({
      method: ['', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = 1; // TODO: Obtener del auth service
    this.cartService.getCartItems(userId).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Error loading cart:', error);
      }
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      this.nextStep();
    }
  }

  onPaymentSubmit(): void {
    if (this.paymentForm.valid) {
      this.nextStep();
    }
  }

  get selectedPaymentMethodName(): string {
    const methodId = this.paymentForm.value.method;
    const method = this.paymentMethods.find(m => m.id === methodId);
    return method ? method.name : '';
  }

  get addressSummary(): string {
    const addr = this.addressForm.value;
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
  }

  getItemSubtotal(item: CarritoItem): number {
    return item.precioUnitario * item.cantidad;
  }

  confirmOrder(): void {
    this.loading = true;
    const checkoutData: CheckoutData = {
      address: this.addressForm.value,
      paymentMethod: this.paymentForm.value
    };

    // Crear orden
    const order = {
      userId: 1, // TODO: Obtener del auth
      items: this.cartItems.map(item => ({
        productId: item.idProducto,
        quantity: item.cantidad,
        price: item.precioUnitario
      })),
      total: this.total,
      status: 'pending'
    };

    this.orderService.createOrder(order).subscribe({
      next: (createdOrder) => {
        // Iniciar pago
        this.paymentService.initiatePayment(
          createdOrder.id!.toString(),
          this.total,
          checkoutData.paymentMethod.type
        ).subscribe({
          next: (payment) => {
            // Limpiar carrito
            this.cartService.clearCart(1).subscribe(() => {
              this.router.navigate(['/payment/status', payment.id]);
            });
          },
          error: (error) => {
            console.error('Error initiating payment:', error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.loading = false;
      }
    });
  }
}