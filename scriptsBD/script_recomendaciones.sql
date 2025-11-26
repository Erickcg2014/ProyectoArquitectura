-- ============================================================
-- CREACIÓN DE BD RECOMENDACIONES
-- PostgreSQL + pgvector
-- ============================================================

-- Habilitar extensión si no existe
CREATE EXTENSION IF NOT EXISTS vector;

---------------------------------------------------------------
-- 1. TABLA PRODUCTO_RECO
--   Copia local del catálogo, para generar embeddings y FAISS
---------------------------------------------------------------
CREATE TABLE producto_reco (
    idProducto UUID PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    precio DECIMAL(10,2),
    imageUrl VARCHAR(255),
    idProveedor UUID NOT NULL,

    -- embedding del producto (vector)
    embedding VECTOR(768),  

    actualizadoEn TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_producto_reco_embedding ON producto_reco USING ivfflat (embedding vector_l2_ops);


---------------------------------------------------------------
-- 2. TABLA USUARIO_COMPRA_RECO
--   Historial de compras del usuario para recomendaciones
---------------------------------------------------------------
CREATE TABLE usuario_compra_reco (
    id SERIAL PRIMARY KEY,
    idUsuario UUID NOT NULL,
    idProducto UUID NOT NULL,
    cantidad INT NOT NULL,
    fechaCompra TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_compra_usuario ON usuario_compra_reco(idUsuario);
CREATE INDEX idx_compra_producto ON usuario_compra_reco(idProducto);


---------------------------------------------------------------
-- 3. TABLA USUARIO_PERFIL_RECO
--   Perfil vectorial del usuario (embedding generado por el sistema)
---------------------------------------------------------------
CREATE TABLE usuario_perfil_reco (
    idUsuario UUID PRIMARY KEY,
    perfil VECTOR(768),     -- embedding del usuario
    actualizadoEn TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_perfil_usuario ON usuario_perfil_reco USING ivfflat (perfil vector_l2_ops);
