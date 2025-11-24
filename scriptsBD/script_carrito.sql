-- ===========================================
-- MICRO_CARRITO
-- ===========================================

-- =============================
-- TABLA CARRITO
-- =============================
CREATE TABLE Carrito (
    id SERIAL PRIMARY KEY,
    idUsuario UUID NOT NULL,   -- ← UUID
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =============================
-- TABLA CarritoItem
-- =============================
CREATE TABLE CarritoItem (
    id SERIAL PRIMARY KEY,
    idCarrito INT NOT NULL,
    idProducto UUID NOT NULL,    -- ← UUID
    cantidad INT NOT NULL,
    descripcion TEXT NOT NULL,
    idProveedor UUID NOT NULL,   -- ← UUID
    precio_unitario DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_carritoitem_carrito
        FOREIGN KEY (idCarrito)
        REFERENCES Carrito(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =============================
-- ÍNDICES 
-- =============================

CREATE INDEX idx_carrito_usuario ON Carrito(idUsuario);

CREATE INDEX idx_itemcarrito_idcarrito ON CarritoItem(idCarrito);

CREATE INDEX idx_itemcarrito_producto ON CarritoItem(idProducto);

CREATE INDEX idx_itemcarrito_proveedor ON CarritoItem(idProveedor);
