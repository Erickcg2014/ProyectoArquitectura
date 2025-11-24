-- ============================================================
-- MICRO_USUARIOS
-- ============================================================

-- =============================
-- 1. TABLA ROLES
-- =============================
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL UNIQUE
);

-- Insertar roles por defecto
INSERT INTO Roles (tipo) VALUES
('cliente'),
('proveedor'),
('administrador');


-- =============================
-- 2. TABLA USUARIOS
-- =============================
CREATE TABLE Usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ← UUID
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(30),
    direccion VARCHAR(150),
    barrio VARCHAR(100),
    ciudad VARCHAR(100),
    departamento VARCHAR(100),
    pais VARCHAR(100) NOT NULL,
    genero VARCHAR(20),
    fecha_nacimiento DATE,
    idRol INT NOT NULL,

    -- Llave foránea a la tabla Roles
    CONSTRAINT fk_roles
        FOREIGN KEY (idRol)
        REFERENCES Roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- Índices 
CREATE INDEX idx_usuarios_email ON Usuarios(email);
CREATE INDEX idx_usuarios_idrol ON Usuarios(idRol);
