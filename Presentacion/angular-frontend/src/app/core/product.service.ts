// src/app/core/products.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, ProductType } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Mock data - luego conectarás con tu backend
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'UltraBook Pro',
      description: 'A sleek, silver ultrabook laptop open on a desk',
      price: 1299.99,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfaJA2IVAE6QKsooXSLFGTpTyOfHlIwoJ2kAxccBSOgkxxAOaHD4eCjHSfYr0Gc8fmphE7gxCWH-1OEsTWpHmmQ7M3VzMKwojgAbL6FLE03u_8tuujQipNsobg4ygyz0Y_iIcBbLOhDGm22A2bobfTIkUFA3jgiZczFw0VpYdHU7IYxh8o3pbmx961cHe2nquoz7dVI0TI8LimZkAN0DxLG-1A9FsMffXDS8azpm8Jg0cZqHFmKTjpVEI1TLusQ91NmdHDncDJXbk',
      ],
      category: 'Technology',
      stock: 15,
      type: ProductType.PHYSICAL,
      inStock: true,
      rating: 4.8,
      reviewCount: 234,
    },
    {
      id: '2',
      name: 'NoiseGuard Headphones',
      description: 'Black over-ear noise-cancelling headphones',
      price: 249.0,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNWphGQx0S__28cwe0NLD06y2q-KhuB6AIA4zRFIRMYiu30-AFloeEWFEhUzwMvZOjx6cHauZqtIv92nwVMdEr8BZcp1pPfRkALM1WgGgJnypdU_YZFLzKn8HdvpNHbNd5g0rQpP5f5Zry7FuGGyIr8YuV_2cQpJVe7Qte97jOEM82aOFq1HprwruiSUWerMTCThi-qeOx60sRPFVdPNNcw3x2pZa8SBWYzOzremQepXOtqcb_WjBKo5ZvPAI93zbs3oCklFD0J5A',
      ],
      category: 'Technology',
      stock: 28,
      type: ProductType.PHYSICAL,
      inStock: true,
      rating: 4.6,
      reviewCount: 156,
    },
    {
      id: '3',
      name: 'Galaxy Phone S24',
      description: 'A modern smartphone with a vibrant screen display',
      price: 999.0,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1TOCuhv3aB__m46QcTcGiWQqvChzhZJkA2igPNLc29xRYMFOjIqRRYIcQ6mrPqsDArV4_ksMoeYvhc8WQgq5Tg8dMrkzNwSrpL_TcSCQLXYnlxHICos7ev6X1ZVc8vUYK885S_qNJB4L-6ns0odBa4qVdYaamfDUujQIxYPsBxyPFpvaXibkJyVLtAbPwH3kqotav4PVzZTIZ2z3FleuElUbxLkaTPFGv00nIucRirypTvwXU48dgKMhpVGKgTbfzj21k9OPKmQ',
      ],
      category: 'Technology',
      stock: 42,
      type: ProductType.PHYSICAL,
      inStock: true,
      rating: 4.9,
      reviewCount: 512,
    },
    {
      id: '4',
      name: 'ChronoSmart Watch',
      description: 'A smartwatch displaying a colorful clock face',
      price: 199.99,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDZL3Tc4fMhgYpezI7gOVOUoSN2GSWiVo3rVCgiJ06G1es8ZrEhsGVQLVwny58Px9Mda3_aW4zOZ9EaRNZ2EEY6gyC0o5e7eNcuFCVZwSEhiZV8BfK_63I8D7lwawVX6-tjlNOCFINGFFL44_0MbscMV6ncJ_ATfkthMYMW1dX1Vzvr7jt5kdHcNLE_w5A6TcO6G_NGy-ltURdladr2THj--vRFR-GzTR8yXvmRmIGX8EORB17rF8gnU1lgkpGfvSOofCUj0Llrduw',
      ],
      category: 'Technology',
      stock: 67,
      type: ProductType.PHYSICAL,
      inStock: true,
      rating: 4.5,
      reviewCount: 89,
    },
    {
      id: '5',
      name: 'NextGen Console',
      description: 'A modern gaming console with its controller',
      price: 499.0,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC0MCwoz9YuRRDBhTd1z-vwtdbqFroLSNC3LGe-Zq9iF80HXmAEkWRzLaeXBh8EiU51PqLl8_nYcZuxLs0XkFquaNeMJt_4NMFxceE0leJfIDfeMfF3bsFoLvNTuZlfxqpDfA73x2mU_iaP04NiK3Zg33jFWoXjiRM0g99wKsmZRwpK44f2NMjG5FY4ocM5XwP28e1lkd2-zPPyzXKS0GOufHvKp_0amcEOiwYyN4LoIc8P8d790Hs4Hjauy2BfydxZRUzdsCRUEhw',
      ],
      category: 'Technology',
      stock: 8,
      type: ProductType.PHYSICAL,
      inStock: true,
      rating: 4.9,
      reviewCount: 1203,
    },
    {
      id: '6',
      name: 'Urban Explorer Backpack',
      description: 'A stylish blue backpack with leather straps',
      price: 89.99,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtJymjsBQlCjAaS3TVEShVxd2MAQffFSwxomKYzCCdv81RJPQyAhDRQDGdVGWozxf7ts1OvIHztEozeDQ8PHH0ZDsoMKtgHYLx0dlD54ZBzDkzV1UZnQQSXsEXrHEbVYxsWpaYn1QpDk54xf-TpaBAI3EN4QdPFKDSAYRFJ3mU3mxN6SFjAvSaoqWc5FfkA7KocVr6sRMeqi1v4g_lTjFtLRghrOxjEerJc69iTPaOlSewpVG63dTk7zRpUom-slNuBN3aF-et9g',
      ],
      category: 'New Arrivals',
      stock: 34,
      type: ProductType.PHYSICAL,
      inStock: true,
      featured: true,
    },
    {
      id: '7',
      name: 'Artisan Desk Lamp',
      description: 'A modern wooden desk lamp with a warm glow',
      price: 120.0,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAmMRBr0twlv_2K4oxl2l7ty4YESpKC9tR9T3YLRgQXCvUaC_SAB634DnZydvrIBI9lw_CbbtbjwWNsx9eJ0uL0NzXbC-dgKNMnjO-CuJ-cnhKEfH0Qk2v-CFkzSXFNfwls0RJfYCvrzUUFnsnN7scEnot4OhVW2Pf3Q-99BzgmYjzqC-EJncp41HiwQ1axeS5P1EdqirtQ3wb7bB7yPNjwrxcMMnAebwFufZl-rLJyt6xwQKWuGKU9gmIqhdTIiyHi8NNgLeXQWZ4',
      ],
      category: 'New Arrivals',
      stock: 19,
      type: ProductType.PHYSICAL,
      inStock: true,
      featured: true,
    },
    {
      id: '8',
      name: 'Pastel Coffee Mugs (Set of 4)',
      description: 'A set of ceramic coffee mugs in pastel colors',
      price: 45.0,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAuQlcoqbrhRovAGSmodD5QaajH4D9efAWTbvquksGItqHXPGgC0zY7h81svx4rQUHFCbpOZ595ghkBOicxEbkDOLDRXELmwrZMtiqn8r23PJllg5lwCaPx2pUPmHiyPg-zVt5ZaqFc0I27Wem2Gn40MwvoRbP6c0guR2yRGCkGd34b128XsPmkM0QmeUg4EOWjtVwH9LYJGw6yszooT3Z7pwUbK9E8pK8E4Dq334Gsqbn6b7oY0buznEc8HFhfPAi0N8MlW41P7kU',
      ],
      category: 'New Arrivals',
      stock: 56,
      type: ProductType.PHYSICAL,
      inStock: true,
      featured: true,
    },
    {
      id: '9',
      name: 'AeroView 4K Drone',
      description: 'A high-end drone flying over a mountain landscape',
      price: 799.0,
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDzjZca3fjwfbl0ZWCTLkkC_8eRapKiw0bIefo1ffNjwfAkacTDHnaaApR_xBsS9ZlDQsUBJHN4fOqqpZOtIxlyEuIZ2uytj6Y0unRH1e4m4H-FhYUOlOZO-hKl93Uiuf-IJeUuo_GcFILM7UGN2I27mwLqZLy64Cf2LIytoB-_7sM8_69vK5OUiUQWjJVHgQAyM-INogsEDpEAm8AshDv4Smn1n4V8_SexYYqoPV-QtBmCwZ0JIyQ4Sir9CHa63KCbg3Y12Q9_a80',
      ],
      category: 'New Arrivals',
      stock: 12,
      type: ProductType.PHYSICAL,
      inStock: true,
      featured: true,
    },
  ];

  constructor() {}

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(500)); // Simula latencia de red
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.mockProducts.filter((p) => p.category === category);
    return of(filtered).pipe(delay(500));
  }

  // Obtener producto por ID
  getProductById(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find((p) => p.id === id);
    return of(product).pipe(delay(300));
  }

  // Obtener productos destacados
  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.mockProducts.filter((p) => p.featured);
    return of(featured).pipe(delay(500));
  }
}
