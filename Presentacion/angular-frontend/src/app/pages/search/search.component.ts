import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../core/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  query: string = '';
  products: Product[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchProducts();
      }
    });
  }

  searchProducts(): void {
    this.loading = true;
    // Por ahora, buscar en todos los productos y filtrar por nombre
    // TODO: Implementar endpoint de búsqueda en back-end
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.filter(p =>
          p.name.toLowerCase().includes(this.query.toLowerCase()) ||
          p.description.toLowerCase().includes(this.query.toLowerCase())
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching products:', error);
        this.loading = false;
      }
    });
  }
}