-- ==============================================
--  MICRO_INVENTARIO
-- ==============================================

-- =============================
-- 1. TABLA CATEGORIA_PRODUCTO
-- =============================
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- =============================
-- 2. TABLA PRODUCTOS
-- =============================
CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),     -- ← UUID
    nombre VARCHAR(150) NOT NULL,
    idProveedor UUID NOT NULL,                         -- ← UUID
    descripcion TEXT,
    precio DECIMAL(10,2),
    cantidadDisponible INT,
    cantidadReservada INT,
    imageUrl VARCHAR(255),
    idCategoria INT,

    CONSTRAINT fk_categoria
        FOREIGN KEY (idCategoria)
        REFERENCES categoria(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- =============================
-- 3. INSERTAR CATEGORÍAS BASE
-- =============================
INSERT INTO categoria (nombre) VALUES
('Supermercado'),
('Tecnología y Electrónica'),
('Hogar, muebles y jardín'),
('Cocina'),
('Gaming'),
('Ropa y accesorios'),
('Salud y Belleza'),
('Deportes y Fitness'),
('Farmacia'),
('Juegos y Juguetes'),
('Motor y Vehículos'),
('Libros, revistas y comics'),
('Construcción e Industria'),
('Servicios'),
('Bebés'),
('Mascotas');
