# API Gateway - Proyecto de Microservicios

## 📋 Descripción

API Gateway centralizado construido con **Spring Cloud Gateway** que actúa como punto de entrada único para una arquitectura de microservicios. Este gateway gestiona el enrutamiento, balanceo de carga y provee una capa de abstracción entre los clientes y los servicios backend.

## 🏗️ Arquitectura

El API Gateway enruta las peticiones a los siguientes microservicios:

- **Inventario** (Puerto 8084): Gestión de inventario y productos
- **Cliente** (Puerto 8085): Administración de clientes
- **Pagos** (Puerto 8086): Procesamiento de transacciones
- **Proveedor** (Puerto 8087): Gestión de proveedores
- **Administrador** (Puerto 8088): Funciones administrativas
- **Recomendaciones** (Puerto 8089): Sistema de recomendaciones

## 🚀 Tecnologías

- **Java 21**
- **Spring Boot 3.3.5**
- **Spring Cloud Gateway 2023.0.3**
- **Maven 3.9.9**
- **Docker & Docker Compose**

## 📦 Requisitos Previos

- Docker Desktop instalado y corriendo
- Puerto 8080 disponible

## 🔧 Instalación y Ejecución

```bash
docker-compose up --build
```

## 🌐 Endpoints

El Gateway está disponible en `http://localhost:8080`

### Rutas Disponibles

| Ruta | Destino | Descripción |
|------|---------|-------------|
| `/api/inventario/**` | localhost:8084 | Servicios de inventario |
| `/api/cliente/**` | localhost:8085 | Servicios de clientes |
| `/api/pagos/**` | localhost:8086 | Servicios de pagos |
| `/api/proveedor/**` | localhost:8087 | Servicios de proveedores |
| `/api/administrador/**` | localhost:8088 | Servicios administrativos |
| `/api/recomendaciones/**` | localhost:8089 | Sistema de recomendaciones |

## 👥 Autores

Proyecto desarrollado para el curso de Arquitectura de Software - 7° Semestre

---

**Versión:** 0.0.1-SNAPSHOT  
**Última actualización:** Noviembre 2025