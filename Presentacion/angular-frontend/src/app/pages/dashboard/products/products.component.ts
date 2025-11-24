import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductCreate } from '../../../models/product.model';
import { ProductsService } from '../../../core/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  showForm = false;
  editingProduct: Product | null = null;
  saving = false;

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      images: [[]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // TODO: Filtrar por providerId
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  showAddForm(): void {
    this.editingProduct = null;
    this.productForm.reset();
    this.showForm = true;
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      images: product.images
    });
    this.showForm = true;
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingProduct = null;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.saving = true;
      const productData = this.productForm.value;

      if (this.editingProduct) {
        // Update
        const updatedProduct = { ...this.editingProduct, ...productData };
        // TODO: Implement update API call
        console.log('Updating product:', updatedProduct);
        this.loadProducts();
        this.cancelEdit();
        this.saving = false;
      } else {
        // Create
        const newProduct: ProductCreate = {
          ...productData,
          providerId: 1 // TODO: Get from auth
        };
        // TODO: Implement create API call
        console.log('Creating product:', newProduct);
        this.loadProducts();
        this.cancelEdit();
        this.saving = false;
      }
    }
  }

  deleteProduct(product: Product): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      // TODO: Implement delete API call
      console.log('Deleting product:', product.id);
      this.loadProducts();
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  }
}