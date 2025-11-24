frontend/
│
├── src/
│ ├── app/
│ │ ├── app.component.ts
│ │ ├── app.component.html
│ │ ├── app.routes.ts
│ │ ├── app.config.ts
│ │ ├── app.config.css
│ │ │
│ │ ├── core/ # 🔵 Servicios HTTP (Singleton)
│ │ │ ├── api.service.ts # Base HTTP service
│ │ │ ├── products.service.ts # Gestión de productos (catálogo)
│ │ │ ├── cart.service.ts # Carrito de compras
│ │ │ ├── auth.service.ts # Autenticación y usuarios
│ │ │ ├── orders.service.ts # Gestión de órdenes
│ │ │ ├── payments.service.ts # Pasarela de pagos
│ │ │ ├── recommendations.service.ts # Motor de recomendaciones
│ │ │ ├── notifications.service.ts # Sistema de notificaciones
│ │ │ └── vendors.service.ts # Gestión de proveedores
│ │ │
│ │ ├── shared/ # 🟢 Componentes compartidos
│ │ │ ├── navbar/ # TopNavBar con búsqueda y carrito
│ │ │ ├── footer/ # Footer del sitio
│ │ │ ├── product-card/ # Tarjeta de producto reutilizable
│ │ │ ├── product-carousel/ # Carrusel horizontal de productos
│ │ │ ├── quantity-selector/ # Selector de cantidad (+/-)
│ │ │ ├── breadcrumb/ # Navegación de migas de pan
│ │ │ ├── loading-spinner/ # Spinner de carga
│ │ │ ├── error-message/ # Mensajes de error
│ │ │ ├── search-bar/ # Barra de búsqueda
│ │ │ ├── filter-sidebar/ # Panel de filtros (categorías, precio)
│ │ │ ├── rating-stars/ # Estrellas de calificación
│ │ │ └── modal/ # Modal genérico
│ │ │
│ │ ├── pages/ # 🟡 Páginas principales
│ │ │ ├── home/ # Homepage con catálogo
│ │ │ │ ├── home.component.ts
│ │ │ │ ├── home.component.html
│ │ │ │ └── home.component.css
│ │ │ │
│ │ │ ├── product-detail/ # Detalle de producto
│ │ │ │ ├── product-detail.component.ts
│ │ │ │ ├── product-detail.component.html
│ │ │ │ ├── product-detail.component.css
│ │ │ │ └── components/
│ │ │ │ ├── product-gallery/ # Galería de imágenes
│ │ │ │ └── seller-info/ # Info del vendedor
│ │ │ │
│ │ │ ├── cart/ # Página del carrito
│ │ │ │ ├── cart.component.ts
│ │ │ │ └── cart.component.html
│ │ │ │
│ │ │ ├── checkout/ # Proceso de pago
│ │ │ │ ├── checkout.component.ts
│ │ │ │ └── components/
│ │ │ │ ├── shipping-form/
│ │ │ │ └── payment-method/
│ │ │ │
│ │ │ ├── category/ # Listado por categoría
│ │ │ │ ├── category.component.ts
│ │ │ │ └── category.component.html
│ │ │ │
│ │ │ ├── search-results/ # Resultados de búsqueda
│ │ │ │ ├── search-results.component.ts
│ │ │ │ └── search-results.component.html
│ │ │ │
│ │ │ ├── profile/ # Perfil de usuario
│ │ │ │ ├── profile.component.ts
│ │ │ │ └── components/
│ │ │ │ ├── order-history/
│ │ │ │ ├── addresses/
│ │ │ │ └── payment-methods/
│ │ │ │
│ │ │ ├── orders/ # Historial de órdenes
│ │ │ │ ├── orders.component.ts
│ │ │ │ └── order-detail/
│ │ │ │
│ │ │ ├── auth/ # Autenticación
│ │ │ │ ├── login/
│ │ │ │ ├── register/
│ │ │ │ └── forgot-password/
│ │ │ │
│ │ │ └── vendor-dashboard/ # Panel de vendedores (opcional)
│ │ │ ├── vendor-dashboard.component.ts
│ │ │ └── components/
│ │ │ ├── product-management/
│ │ │ ├── inventory/
│ │ │ └── sales-analytics/
│ │ │
│ │ └── models/ # 🔴 TypeScript interfaces
│ │ ├── product.model.ts # Producto (físico/servicio/digital)
│ │ ├── cart.model.ts # Carrito y CartItem
│ │ ├── order.model.ts # Orden de compra
│ │ ├── user.model.ts # Usuario/Cliente
│ │ ├── vendor.model.ts # Proveedor
│ │ ├── payment.model.ts # Métodos de pago
│ │ ├── address.model.ts # Dirección de envío
│ │ ├── category.model.ts # Categorías
│ │ └── recommendation.model.ts # Recomendaciones
│ │
│ ├── assets/
│ │ ├── styles/
│ │ │ └── tailwind-custom.css # Estilos custom de Tailwind
│ │ ├── images/
│ │ │ ├── logo.svg
│ │ │ ├── placeholders/
│ │ │ └── banners/
│ │ └── icons/ # Material Symbols offline (opcional)
│ │
│ ├── environments/
│ │ ├── environment.ts # Dev (localhost)
│ │ └── environment.prod.ts # Production
│ │
│ ├── index.html
│ ├── main.ts
│ └── styles.css # Importa Tailwind
│
├── angular.json
├── package.json
├── tailwind.config.js # Configuración de Tailwind
├── tsconfig.json
├── Dockerfile
├── nginx.conf
└── docker-compose.yml
