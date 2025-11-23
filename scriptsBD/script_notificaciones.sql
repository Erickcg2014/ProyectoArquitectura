-- ===========================================
-- MICRO_NOTIFICACION 
-- ===========================================

-- =============================
-- TABLA Canal_Notificacion (catálogo)
-- =============================
CREATE TABLE Canal_Notificacion (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL UNIQUE
);

-- =============================
-- TABLA Estado_Notificacion (catálogo)
-- =============================
CREATE TABLE Estado_Notificacion (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(30) NOT NULL UNIQUE
);

-- =============================
-- TABLA Notificacion
-- =============================
CREATE TABLE Notificacion (
    id SERIAL PRIMARY KEY,
    idUsuario UUID NOT NULL,                     -- ← UUID
    idCanal INT NOT NULL,
    idEstado INT NOT NULL,

    asunto VARCHAR(200) NOT NULL,                
    cuerpo TEXT NOT NULL,                       
    contenido TEXT NOT NULL,                     
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),     

    CONSTRAINT fk_notificacion_canal
        FOREIGN KEY (idCanal)
        REFERENCES Canal_Notificacion(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_notificacion_estado
        FOREIGN KEY (idEstado)
        REFERENCES Estado_Notificacion(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- =============================
-- ÍNDICES 
-- =============================
CREATE INDEX idx_notif_usuario ON Notificacion(idUsuario);
CREATE INDEX idx_notif_canal ON Notificacion(idCanal);
CREATE INDEX idx_notif_estado ON Notificacion(idEstado);
