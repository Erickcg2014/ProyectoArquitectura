-- ===========================================
-- MICRO_ORDENES 
-- ===========================================

-- =============================
-- TABLA ORDEN
-- =============================
CREATE TABLE Orden (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),   
    idUsuario UUID NOT NULL,                         
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    direccionBarrio VARCHAR(100) NOT NULL,
    direccionCiudad VARCHAR(100) NOT NULL,
    direccionDepartamento VARCHAR(100) NOT NULL,
    direccionesPais VARCHAR(100) NOT NULL,
    creadoEn TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =============================
-- TABLA ORDEN_ITEM
-- =============================
CREATE TABLE Orden_Item (
    id SERIAL PRIMARY KEY,
    idOrden UUID NOT NULL,                           
    idProducto UUID NOT NULL,                        
    idProveedor UUID NOT NULL,                       
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_orditem_orden
        FOREIGN KEY (idOrden)
        REFERENCES Orden(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =============================
-- TABLA RESUMEN_PROVEEDOR_ORDEN
-- =============================
CREATE TABLE Resumen_Proveedor_Orden (
    id SERIAL PRIMARY KEY,
    idProveedor UUID NOT NULL,                       
    idOrden UUID NOT NULL,                           
    totalProveedor DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_resumen_orden
        FOREIGN KEY (idOrden)
        REFERENCES Orden(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =============================
-- ÍNDICES 
-- =============================

CREATE INDEX idx_orden_usuario ON Orden(idUsuario);

CREATE INDEX idx_ordenitem_proveedor ON Orden_Item(idProveedor);

CREATE INDEX idx_ordenitem_orden ON Orden_Item(idOrden);

CREATE INDEX idx_resumen_proveedor ON Resumen_Proveedor_Orden(idProveedor);

CREATE INDEX idx_resumen_orden ON Resumen_Proveedor_Orden(idOrden);
