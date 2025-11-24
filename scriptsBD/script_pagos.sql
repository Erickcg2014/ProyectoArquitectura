-- ===========================================
-- MICRO_PAGOS
-- ===========================================


-- =============================
-- TABLA MetodoPago 
-- =============================
CREATE TABLE MetodoPago (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL UNIQUE
);


-- =============================
-- TABLA EstadoPago 
-- =============================
CREATE TABLE EstadoPago (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(30) NOT NULL UNIQUE
);


-- =============================
-- TABLA Pago
-- =============================
CREATE TABLE Pago (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),   -- ← UUID
    idOrden UUID NOT NULL,                           -- ← UUID 
    monto DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),
    idEstadoPago INT NOT NULL,
    idMetodoPago INT NOT NULL,

    CONSTRAINT fk_pago_estado
        FOREIGN KEY (idEstadoPago)
        REFERENCES EstadoPago(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_pago_metodo
        FOREIGN KEY (idMetodoPago)
        REFERENCES MetodoPago(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- =============================
-- TABLA TransaccionPago
-- =============================
CREATE TABLE TransaccionPago (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),    -- ← UUID
    idPago UUID NOT NULL,                             -- ← UUID
    gatewayId VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_transaccion_pago
        FOREIGN KEY (idPago)
        REFERENCES Pago(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- =============================
-- INSERTAR ESTADOS Y MÉTODOS BASE
-- =============================

INSERT INTO EstadoPago (estado) VALUES
('pendiente'),
('aprobado'),
('rechazado'),
('fallido');

INSERT INTO MetodoPago (tipo) VALUES
('tarjeta_credito'),
('tarjeta_debito'),
('pse'),
('efectivo');
