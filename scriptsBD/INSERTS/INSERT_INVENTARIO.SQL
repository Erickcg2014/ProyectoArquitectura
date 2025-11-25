-- ID DE CATEGORÍAS 

-- 1 "Supermercado" 
-- 2 "Tecnología y Electrónica" 
-- 3 "Hogar, muebles y jardín" 
-- 4 "Cocina" 
-- 5 "Gaming" 
-- 6 "Ropa y accesorios" 
-- 7 "Salud y Belleza" 
-- 8 "Deportes y Fitness" 
-- 9 "Farmacia" 
-- 10 "Juegos y Juguetes" 
-- 11 "Motor y Vehículos" 
-- 12 "Libros, revistas y comics" 
-- 13 "Construcción e Industria" 
-- 14 "Servicios" 
-- 15 "Bebés" 
-- 16 "Mascotas"

-- CATEGORÍA 1 - SUPERMERCADO 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Arroz Roa 5kg', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Arroz blanco tipo extra 5kg', 18000, 50, 0, 'javemarket_bucket/productos/SUPERMERCADO/arroz_roa_5kg.png', 1),
('Aceite Premier 1000ml', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Aceite vegetal 100% puro', 9500, 60, 0, 'javemarket_bucket/productos/SUPERMERCADO/aceite_premier_1l.png', 1),
('Leche Alquería 1L', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Leche entera larga vida', 4200, 80, 0, 'javemarket_bucket/productos/SUPERMERCADO/leche_alqueria_1l.png', 1),
('Huevos Kikes 30 und', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Huevos AA frescos', 15000, 40, 0, 'javemarket_bucket/productos/SUPERMERCADO/huevos_kikes_30.png', 1),
('Fríjol Cargamanto 500g', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Fríjol rojo cargamanto seleccionado', 5600, 55, 0, 'javemarket_bucket/productos/SUPERMERCADO/frijol_cargamanto.png', 1),
('Azúcar Manuelita 1kg', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Azúcar refinada blanca', 3500, 70, 0, 'javemarket_bucket/productos/SUPERMERCADO/azucar_manuelita_1kg.png', 1),
('Pasta Doria Spaghetti 500g', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Pasta de trigo durum', 3200, 65, 0, 'javemarket_bucket/productos/SUPERMERCADO/pasta_doria_spaghetti.png', 1),
('Café Sello Rojo 500g', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Café molido tradicional colombiano', 14500, 40, 0, 'javemarket_bucket/productos/SUPERMERCADO/cafe_sello_rojo_500g.png', 1),
('Sal Refisal 1000g', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Sal refinada yodada', 2600, 75, 0, 'javemarket_bucket/productos/SUPERMERCADO/sal_refisal_1kg.png', 1),
('Pan Tajado Bimbo 500g', '529ea9a0-2bcf-41e0-a655-28c03f48b247', 'Pan tajado blanco Bimbo', 5200, 65, 0, 'javemarket_bucket/productos/SUPERMERCADO/pan_tajado_bimbo.png', 1);


-- CATEGORÍA 2 - TECNOLOGIA Y ELECTRÓNICA
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Laptop Lenovo IdeaPad 3', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Laptop 8GB RAM, 256GB SSD, 14 pulgadas', 1799900, 30, 0, 'javemarket_bucket/productos/TECNOLOGIA/lenovo_ideapad3.png', 2),
('TV Samsung 55" UHD 4K', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Televisor inteligente con HDR', 2499900, 25, 0, 'javemarket_bucket/productos/TECNOLOGIA/tv_samsung_55.png', 2),
('Audífonos Bluetooth JBL Tune 510', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Sonido JBL Pure Bass', 159900, 50, 0, 'javemarket_bucket/productos/TECNOLOGIA/jbl_tune510.png', 2),
('Celular Samsung A34', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', '128GB, 6GB RAM, batería 5000mAh', 1149900, 40, 0, 'javemarket_bucket/productos/TECNOLOGIA/samsung_a34.png', 2),
('Mouse Logitech M170', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Mouse inalámbrico óptico', 35000, 70, 0, 'javemarket_bucket/productos/TECNOLOGIA/logitech_m170.png', 2),
('Teclado Microsoft Wired 600', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Teclado alámbrico resistente', 69000, 60, 0, 'javemarket_bucket/productos/TECNOLOGIA/teclado_ms600.png', 2),
('Impresora HP DeskJet 2720', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Multifuncional wifi todo en uno', 299000, 30, 0, 'javemarket_bucket/productos/TECNOLOGIA/hp_deskjet2720.png', 2),
('Tablet Amazon Fire 7', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Tablet 7 pulgadas, 16GB', 229900, 45, 0, 'javemarket_bucket/productos/TECNOLOGIA/amazon_fire7.png', 2),
('Cámara Logitech C920 HD', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Webcam 1080p con micrófono', 199900, 35, 0, 'javemarket_bucket/productos/TECNOLOGIA/logitech_c920.png', 2),
('Bocina Bluetooth Sony SRS-XB13', '3c688a17-ea1b-4c8f-a852-8fedf81050c2', 'Extra Bass portátil', 179900, 50, 0, 'javemarket_bucket/productos/TECNOLOGIA/sony_xb13.png', 2);

-- CATEGORÍA 3 - HOGAR, MUEBLES Y JARDÍN 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Silla Eames Blanca', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Silla decorativa estilo escandinavo', 129900, 40, 0, 'javemarket_bucket/productos/HOGAR/silla_eames_blanca.jpg', 3),
('Mesa de Centro Minimalista', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Mesa rectangular en madera MDF', 249900, 30, 0, 'javemarket_bucket/productos/HOGAR/mesa_centro_minimalista.jpg', 3),
('Lampara LED de Escritorio', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Lámpara con brazo flexible', 59900, 50, 0, 'javemarket_bucket/productos/HOGAR/lampara_led_escritorio.jpg', 3),
('Organizador de Ropa 5 niveles', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Organizador en tela reforzada', 89900, 60, 0, 'javemarket_bucket/productos/HOGAR/organizador_ropa.jpg', 3),
('Set de Jardinería 5 piezas', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Herramientas para jardinería doméstica', 49900, 70, 0, 'javemarket_bucket/productos/HOGAR/set_jardineria.jpg', 3),
('Ventilador de Torre 40W', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Ventilador silencioso con 3 velocidades', 159900, 30, 0, 'javemarket_bucket/productos/HOGAR/ventilador_torre.jpg', 3),
('Cortinas Blackout 140x220', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Cortina bloqueadora de luz', 79900, 50, 0, 'javemarket_bucket/productos/HOGAR/cortinas_blackout.jpg', 3),
('Espejo Decorativo Redondo', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Espejo minimalista marco dorado', 89900, 40, 0, 'javemarket_bucket/productos/HOGAR/espejo_redondo.jpg', 3),
('Colchón Doble Ortopédico', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Colchón firmeza intermedia, tela antiácaros', 899900, 20, 0, 'javemarket_bucket/productos/HOGAR/colchon_doble.jpg', 3),
('Juego de Sábanas Queen', '3024ccc1-eccc-4b4e-b5fd-3f82d993691b', 'Set de 4 piezas en microfibra', 129900, 60, 0, 'javemarket_bucket/productos/HOGAR/sabanas_queen.jpg', 3);

-- CATEGORÍA 4 - COCINA 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Batería de Cocina 12 piezas', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Ollas antiadherentes de aluminio', 259900, 35, 0, 'javemarket_bucket/productos/COCINA/bateria_cocina_12p.jpg', 4),
('Sartén Antiadherente 24cm', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Sartén en teflón de alta resistencia', 39900, 50, 0, 'javemarket_bucket/productos/COCINA/sarten_24cm.jpg', 4),
('Juego de Cuchillos 7 piezas', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Cuchillos de acero inoxidable con base', 74900, 40, 0, 'javemarket_bucket/productos/COCINA/cuchillos_7p.jpg', 4),
('Licuadora Oster 1.5L', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Motor de 700W, vaso de vidrio', 199900, 30, 0, 'javemarket_bucket/productos/COCINA/licuadora_oster.jpg', 4),
('Sanduchera Doble Universal', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Sanduchera antiadherente para 2 porciones', 69900, 55, 0, 'javemarket_bucket/productos/COCINA/sanduchera_universal.jpg', 4),
('Airfryer Imusa 3.2L', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Freidora de aire saludable', 289900, 20, 0, 'javemarket_bucket/productos/COCINA/airfryer_imusa.jpg', 4),
('Olla a Presión 6L', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Acero inoxidable de alta resistencia', 119900, 40, 0, 'javemarket_bucket/productos/COCINA/olla_presion_6l.jpg', 4),
('Tostadora Eléctrica 2 ranuras', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Tostadora con control ajustable', 59900, 60, 0, 'javemarket_bucket/productos/COCINA/tostadora.jpg', 4),
('Jarra Medidora 1L', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Jarra plástica con medidas precisas', 12900, 80, 0, 'javemarket_bucket/productos/COCINA/jarra_medidora.jpg', 4),
('Batidora Manual 5 velocidades', '054a69a8-fe51-46ed-ab5b-183324fbdef2', 'Batidora eléctrica de 250W', 89900, 50, 0, 'javemarket_bucket/productos/COCINA/batidora_manual.jpg', 4);

-- CATEGORÍA 5 - GAMING 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Teclado Mecánico Redragon K552', '77a7b702-87e0-4a73-a047-81d107127b96', 'Teclado mecánico retroiluminado', 159900, 45, 0, 'javemarket_bucket/productos/GAMING/redragon_k552.jpg', 5),
('Mouse Gamer Logitech G502 HERO', '77a7b702-87e0-4a73-a047-81d107127b96', 'Mouse gamer 16000 DPI', 229900, 50, 0, 'javemarket_bucket/productos/GAMING/logitech_g502.jpg', 5),
('Audífonos HyperX Cloud II', '77a7b702-87e0-4a73-a047-81d107127b96', 'Sonido envolvente 7.1', 399900, 35, 0, 'javemarket_bucket/productos/GAMING/hyperx_cloud2.jpg', 5),
('Silla Gamer Cougar Armor One', '77a7b702-87e0-4a73-a047-81d107127b96', 'Silla ergonómica para alto rendimiento', 899900, 20, 0, 'javemarket_bucket/productos/GAMING/cougar_armor_one.jpg', 5),
('Monitor Gamer LG 24" 144Hz', '77a7b702-87e0-4a73-a047-81d107127b96', 'Monitor IPS 1ms 144Hz', 799900, 25, 0, 'javemarket_bucket/productos/GAMING/lg_24_144hz.jpg', 5),
('Control Xbox Series X', '77a7b702-87e0-4a73-a047-81d107127b96', 'Control inalámbrico oficial', 279900, 40, 0, 'javemarket_bucket/productos/GAMING/control_xbox_seriesx.jpg', 5),
('PlayStation 5 Controller DualSense', '77a7b702-87e0-4a73-a047-81d107127b96', 'Control inalámbrico original PS5', 349900, 35, 0, 'javemarket_bucket/productos/GAMING/ps5_dualsense.jpg', 5),
('Nintendo Switch OLED', '77a7b702-87e0-4a73-a047-81d107127b96', 'Consola Switch modelo OLED', 1799900, 15, 0, 'javemarket_bucket/productos/GAMING/switch_oled.jpg', 5),
('Camara Streaming Logitech StreamCam', '77a7b702-87e0-4a73-a047-81d107127b96', 'Cámara para streaming 1080p', 499900, 20, 0, 'javemarket_bucket/productos/GAMING/logitech_streamcam.jpg', 5),
('Alfombrilla Gamer RGB XL', '77a7b702-87e0-4a73-a047-81d107127b96', 'Mousepad RGB extendido', 89900, 60, 0, 'javemarket_bucket/productos/GAMING/mousepad_rgb_xl.jpg', 5);

-- CATEGORÍA 6 - ROPA Y ACCESORIOS
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Camiseta Básica Blanca', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Camiseta clásica unisex 100% algodón', 19900, 60, 0, 'javemarket_bucket/productos/ROPA/camiseta_blanca.jpg', 6),
('Jeans Skinny Azul', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Jeans denim con ajuste slim', 89900, 40, 0, 'javemarket_bucket/productos/ROPA/jeans_skinny_azul.jpg', 6),
('Chaqueta Rompeviento Unisex', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Chaqueta ligera impermeable', 129900, 35, 0, 'javemarket_bucket/productos/ROPA/chaqueta_rompeviento.jpg', 6),
('Tenis Deportivos Blancos', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Tenis casuales para uso diario', 149900, 50, 0, 'javemarket_bucket/productos/ROPA/tenis_blancos.jpg', 6),
('Gorra Negra Clásica', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Gorra ajustable estilo urbano', 24900, 80, 0, 'javemarket_bucket/productos/ROPA/gorra_negra.jpg', 6),
('Bolso Tote de Lona', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Bolso tote reforzado ecológico', 29900, 55, 0, 'javemarket_bucket/productos/ROPA/bolso_tote.jpg', 6),
('Reloj Deportivo Digital', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Reloj resistente al agua con cronómetro', 59900, 40, 0, 'javemarket_bucket/productos/ROPA/reloj_deportivo.jpg', 6),
('Bufanda Tejida Unisex', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Bufanda de lana suave para clima frío', 35000, 70, 0, 'javemarket_bucket/productos/ROPA/bufanda_tejida.jpg', 6),
('Cinturón de Cuero Café', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Cinturón de cuero sintético reforzado', 39900, 60, 0, 'javemarket_bucket/productos/ROPA/cinturon_cafe.jpg', 6),
('Lentes de Sol Clásicos', '54fc94a4-7b3b-4a12-97df-297fa319b4f9', 'Lentes UV400 estilo aviador', 49900, 50, 0, 'javemarket_bucket/productos/ROPA/lentes_aviador.jpg', 6);

-- CATEGORÍA 7 - SALUD Y BELLEZA 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Shampoo Head & Shoulders 375ml', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Shampoo anticaspa con mentol', 15900, 70, 0, 'javemarket_bucket/productos/SALUD/shampoo_hs_375.jpg', 7),
('Crema Hidratante Nivea 200ml', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Crema hidratante corporal', 12900, 90, 0, 'javemarket_bucket/productos/SALUD/nivea_200ml.jpg', 7),
('Maquillaje Base Maybelline Fit Me', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Base líquida tono natural', 34900, 60, 0, 'javemarket_bucket/productos/SALUD/maybelline_fitme.jpg', 7),
('Protector Solar Neutrogena FPS 50', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Protector resistente al agua', 45900, 75, 0, 'javemarket_bucket/productos/SALUD/protector_neutrogena.jpg', 7),
('Labial Matte CoverGirl', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Labial mate alta duración', 25900, 85, 0, 'javemarket_bucket/productos/SALUD/labial_matte.jpg', 7),
('Acondicionador Pantene 400ml', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Acondicionador para cabello suave y brillante', 16900, 70, 0, 'javemarket_bucket/productos/SALUD/acondicionador_pantene.jpg', 7),
('Kit Cuidado Facial Garnier', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Limpieza + Tónico + Hidratante', 42900, 50, 0, 'javemarket_bucket/productos/SALUD/garnier_facial.jpg', 7),
('Perfume Benetton Colors Woman', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Fragancia floral fresca', 79900, 30, 0, 'javemarket_bucket/productos/SALUD/perfume_benetton.jpg', 7),
('Crema Antiarrugas L’Oréal Revitalift', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Crema antiedad para piel madura', 64900, 40, 0, 'javemarket_bucket/productos/SALUD/revitalift.jpg', 7),
('Desodorante Dove Barra 50g', '0ee80e6d-79ae-4ec2-9677-d0d5fa2b9e84', 'Desodorante hidratante 48h', 11900, 100, 0, 'javemarket_bucket/productos/SALUD/desodorante_dove.jpg', 7);


-- CATEGORÍA 8 - DEPORTES Y FITNESS
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Mancuernas 5kg Par', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Mancuernas recubiertas en neopreno', 79900, 40, 0, 'javemarket_bucket/productos/DEPORTES/mancuernas_5kg.jpg', 8),
('Esterilla Yoga Antideslizante', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Esterilla de 10mm acolchada', 49900, 60, 0, 'javemarket_bucket/productos/DEPORTES/esterilla_yoga.jpg', 8),
('Liga de Resistencia Set x5', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Set de bandas elásticas para entrenamiento', 29900, 80, 0, 'javemarket_bucket/productos/DEPORTES/ligas_resistencia.jpg', 8),
('Balón Fútbol Golty Oficial', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Balón cosido tamaño 5', 74900, 50, 0, 'javemarket_bucket/productos/DEPORTES/balon_golty.jpg', 8),
('Guantes de Gimnasio Unisex', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Guantes acolchados con agarre', 29900, 70, 0, 'javemarket_bucket/productos/DEPORTES/guantes_gym.jpg', 8),
('Bicicleta Estática Hogar', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Bicicleta con resistencia ajustable', 499900, 25, 0, 'javemarket_bucket/productos/DEPORTES/bicicleta_estatica.jpg', 8),
('Soga para Saltar Profesional', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Soga rápida con rodamientos', 19900, 90, 0, 'javemarket_bucket/productos/DEPORTES/soga_saltar.jpg', 8),
('Proteína Whey 2lb', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Proteína concentrada sabor vainilla', 109900, 40, 0, 'javemarket_bucket/productos/DEPORTES/proteina_whey.jpg', 8),
('Rodillera Deportiva Ajustable', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Soporte para alta actividad física', 25900, 70, 0, 'javemarket_bucket/productos/DEPORTES/rodillera.jpg', 8),
('Guante Boxeo Entrenamiento 12oz', 'ef4a2840-5ba8-4c3a-8cd8-616b7272dedb', 'Guantes acolchados para boxeo', 89900, 30, 0, 'javemarket_bucket/productos/DEPORTES/guantes_boxeo.jpg', 8);

-- CATEGORÍA 9 - FARMACIA
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Acetaminofén MK 500mg x 100', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Analgesico y antipirético', 13900, 90, 0, 'javemarket_bucket/productos/FARMACIA/acetaminofen_mk.jpg', 9),
('Ibuprofeno 400mg x 50', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Antiinflamatorio no esteroideo', 15900, 60, 0, 'javemarket_bucket/productos/FARMACIA/ibuprofeno_400.jpg', 9),
('Alcohol Antiséptico 70% 1000ml', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Desinfectante de uso general', 8900, 80, 0, 'javemarket_bucket/productos/FARMACIA/alcohol_70.jpg', 9),
('Termómetro Digital Punta Flexible', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Termómetro clínico digital', 18900, 50, 0, 'javemarket_bucket/productos/FARMACIA/termometro_digital.jpg', 9),
('Gasas Esterilizadas x 20', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Gasas estériles absorbentes', 6900, 90, 0, 'javemarket_bucket/productos/FARMACIA/gasas.jpg', 9),
('Cinta Micropore 2.5cm', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Cinta adhesiva hipoalergénica', 2900, 100, 0, 'javemarket_bucket/productos/FARMACIA/micropore.jpg', 9),
('Sales de Rehidratación Oral', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Sobres de solución hidratante', 4900, 75, 0, 'javemarket_bucket/productos/FARMACIA/sales_rehidratacion.jpg', 9),
('Tapabocas KN95 Caja x 10', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Tapabocas de protección avanzada', 12900, 90, 0, 'javemarket_bucket/productos/FARMACIA/kn95.jpg', 9),
('Vaselina Neutra 100g', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Hidratante protector de la piel', 5900, 80, 0, 'javemarket_bucket/productos/FARMACIA/vaselina.jpg', 9),
('Caja de Guantes de Nitrilo x 100', '24f7bb65-0cb8-4861-9ffe-c60e4f86fdc4', 'Guantes sin talco resistentes', 39900, 50, 0, 'javemarket_bucket/productos/FARMACIA/guantes_nitrilo.jpg', 9);

-- CATEGORÍA 10 - JUEGOS Y JUGUETES 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Lego Classic 500 piezas', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Caja creativa de construcción', 149900, 40, 0, 'javemarket_bucket/productos/JUEGOS/lego_500.jpg', 10),
('Muñeca Barbie Original', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Muñeca Barbie estándar Mattel', 89900, 50, 0, 'javemarket_bucket/productos/JUEGOS/barbie_original.jpg', 10),
('Pelota Antiestrés Infantil', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Pelota antiestrés suave colores', 9900, 80, 0, 'javemarket_bucket/productos/JUEGOS/pelota_antistress.jpg', 10),
('Juego de Mesa Uno Original', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Juego de cartas Uno Mattel', 29900, 70, 0, 'javemarket_bucket/productos/JUEGOS/uno_original.jpg', 10),
('Carro a Control Remoto 4x4', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Carro eléctrico todo terreno', 129900, 30, 0, 'javemarket_bucket/productos/JUEGOS/carro_4x4.jpg', 10),
('Rompecabezas 1000 piezas', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Rompecabezas paisaje montaña', 39900, 60, 0, 'javemarket_bucket/productos/JUEGOS/rompecabezas_1000.jpg', 10),
('Plastilina Play-Doh Set x10', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Set de plastilinas de colores', 34900, 90, 0, 'javemarket_bucket/productos/JUEGOS/playdoh_10.jpg', 10),
('Balón Infantil de Espuma', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Balón ligero de espuma EVA', 19900, 75, 0, 'javemarket_bucket/productos/JUEGOS/balon_espuma.jpg', 10),
('Peluche Oso Gigante 80cm', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Peluche de oso suave 80cm', 59900, 40, 0, 'javemarket_bucket/productos/JUEGOS/oso_80cm.jpg', 10),
('Set de Dinosaurios Plástico x 6', 'cadbd5ca-871f-4955-9c4f-fd953a2d7033', 'Dinosaurios de juguete resistentes', 24900, 80, 0, 'javemarket_bucket/productos/JUEGOS/dinosaurios_6.jpg', 10);

-- CATEGORÍA 11 - MOTOR Y VEHÍCULOS 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Aceite de Motor 20W50', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Aceite lubricante multigrado para motor gasolina', 29900, 50, 0, 'javemarket_bucket/productos/MOTOR/aceite_20w50.jpg', 11),
('Cascos Motos Certificado DOT', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Casco de seguridad con visor anti-rayones', 129900, 40, 0, 'javemarket_bucket/productos/MOTOR/casco_moto.jpg', 11),
('Guantes para Moto con Refuerzo', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Guantes resistentes con protección en nudillos', 39900, 60, 0, 'javemarket_bucket/productos/MOTOR/guantes_moto.jpg', 11),
('Luz LED para Moto 12V', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Luz blanca de alta intensidad', 19900, 70, 0, 'javemarket_bucket/productos/MOTOR/led_moto.jpg', 11),
('Batería para Moto 9Ah', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Batería de gel libre de mantenimiento', 129900, 30, 0, 'javemarket_bucket/productos/MOTOR/bateria_moto.jpg', 11),
('Kit Herramientas para Carro 24 piezas', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Kit básico de emergencia para vehículo', 89900, 35, 0, 'javemarket_bucket/productos/MOTOR/kit_herramientas_carro.jpg', 11),
('Soporte Celular para Carro', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Soporte universal para parabrisas', 25900, 80, 0, 'javemarket_bucket/productos/MOTOR/soporte_celular_carro.jpg', 11),
('Compresor de Aire Portátil', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Compresor 12V para inflar llantas', 79900, 45, 0, 'javemarket_bucket/productos/MOTOR/compresor_portatil.jpg', 11),
('Limpiaparabrisas Universal 16"', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Escobillas de caucho premium', 15900, 70, 0, 'javemarket_bucket/productos/MOTOR/limpiaparabrisas.jpg', 11),
('Aditivo Limpia Inyectores 250ml', 'ccbfc588-001b-4262-a2f0-bb65320ffa04', 'Mejora rendimiento del motor', 19900, 65, 0, 'javemarket_bucket/productos/MOTOR/limpia_inyectores.jpg', 11);

-- CATEGORÍA 12 - LIBROS, REVISTAS Y COMICS
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Cien Años de Soledad – García Márquez', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Edición especial tapa blanda', 39900, 50, 0, 'javemarket_bucket/productos/LIBROS/cien_anos_soledad.jpg', 12),
('El Principito – Antoine de Saint-Exupéry', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Libro clásico ilustrado', 25900, 70, 0, 'javemarket_bucket/productos/LIBROS/principito.jpg', 12),
('Revista Semana – Edición Actual', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Revista informativa semanal', 12900, 40, 0, 'javemarket_bucket/productos/LIBROS/revista_semana.jpg', 12),
('Comic Marvel – Spider-Man #1', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Comic edición coleccionista', 18900, 60, 0, 'javemarket_bucket/productos/LIBROS/spiderman_1.jpg', 12),
('El Poder del Ahora – Eckhart Tolle', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Libro de crecimiento personal', 34900, 55, 0, 'javemarket_bucket/productos/LIBROS/poder_ahora.jpg', 12),
('Harry Potter y la Piedra Filosofal', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Edición juvenil tapa dura', 49900, 45, 0, 'javemarket_bucket/productos/LIBROS/harry_potter1.jpg', 12),
('Agenda Escolar 2025', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Agenda de 12 meses', 15900, 80, 0, 'javemarket_bucket/productos/LIBROS/agenda_2025.jpg', 12),
('Libro Coloring Mandalas', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Libro para colorear antiestrés', 19900, 75, 0, 'javemarket_bucket/productos/LIBROS/mandalas.jpg', 12),
('Diario Personal con Candado', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Diario decorado para adolescentes', 18900, 65, 0, 'javemarket_bucket/productos/LIBROS/diario_candado.jpg', 12),
('Bloque de Notas Adhesivas x 400', '4dc09803-642e-4add-8123-2d20b83d67a4', 'Notas adhesivas multicolor', 9900, 90, 0, 'javemarket_bucket/productos/LIBROS/postits_400.jpg', 12);

-- CATEGORÍA 13 - CONSTRUCCION E INDUSTRIA 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Cemento Gris 50kg', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Cemento para construcción general', 29900, 40, 0, 'javemarket_bucket/productos/CONSTRUCCION/cemento_50kg.jpg', 13),
('Pintura Vinilo Blanco 1 Galón', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Pintura vinílica lavable', 39900, 35, 0, 'javemarket_bucket/productos/CONSTRUCCION/pintura_blanco.jpg', 13),
('Llave Inglesa Ajustable 12"', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Herramienta de acero templado', 25900, 70, 0, 'javemarket_bucket/productos/CONSTRUCCION/llave_ajustable.jpg', 13),
('Brocha 2 Pulgadas', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Brocha cerdas finas para pintura', 6900, 90, 0, 'javemarket_bucket/productos/CONSTRUCCION/brocha_2.jpg', 13),
('Tubería PVC 1” 3m', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Tubo PVC presión liviana', 13900, 50, 0, 'javemarket_bucket/productos/CONSTRUCCION/tuberia_pvc.jpg', 13),
('Guantes Industriales Naranja', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Guantes de caucho reforzado', 9900, 80, 0, 'javemarket_bucket/productos/CONSTRUCCION/guantes_industriales.jpg', 13),
('Martillo Carpintero Mango Fibra', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Martillo resistente impacto medio', 16900, 60, 0, 'javemarket_bucket/productos/CONSTRUCCION/martillo_carpintero.jpg', 13),
('Cinta Métrica 5 Metros', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Cinta de acero retráctil', 10900, 75, 0, 'javemarket_bucket/productos/CONSTRUCCION/cinta_metrica.jpg', 13),
('Taladro Eléctrico 600W', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Taladro con percusión y velocidad variable', 159900, 25, 0, 'javemarket_bucket/productos/CONSTRUCCION/taladro_600w.jpg', 13),
('Set Tornillos Construcción x100', '5289eb15-a3a0-4285-a119-c8cf4ad3c6bf', 'Tornillos galvanizados para estructura', 12900, 85, 0, 'javemarket_bucket/productos/CONSTRUCCION/tornillos_100.jpg', 13);

-- CATEGORÍA 14 - SERVICIOS 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Servicio de Limpieza Hogar', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Limpieza profunda por 4 horas', 89900, 100, 0, 'javemarket_bucket/productos/SERVICIOS/servicio_limpieza.jpg', 14),
('Clases Personalizadas de Inglés', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Clases virtuales individuales', 69900, 200, 0, 'javemarket_bucket/productos/SERVICIOS/clases_ingles.jpg', 14),
('Reparación de Computadores', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Servicio de diagnóstico y arreglo básico', 49900, 120, 0, 'javemarket_bucket/productos/SERVICIOS/reparacion_pc.jpg', 14),
('Asesoría Contable 1 hora', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Asesoría profesional tributaria', 99900, 80, 0, 'javemarket_bucket/productos/SERVICIOS/asesoria_contable.jpg', 14),
('Clases de Guitarra Virtuales', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Clases por videollamada', 45900, 150, 0, 'javemarket_bucket/productos/SERVICIOS/clases_guitarra.jpg', 14),
('Paseador de Perros 1h', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Servicio por hora, perros pequeños o medianos', 19900, 200, 0, 'javemarket_bucket/productos/SERVICIOS/paseador_perros.jpg', 14),
('Curso Programación Básica', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Curso de 4 semanas modalidad virtual', 149900, 150, 0, 'javemarket_bucket/productos/SERVICIOS/curso_programacion.jpg', 14),
('Servicio de Mudanza Urbana', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Incluye vehículo y 2 ayudantes', 299900, 50, 0, 'javemarket_bucket/productos/SERVICIOS/servicio_mudanza.jpg', 14),
('Clases de Baile', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Clases de salsa y bachata', 39900, 120, 0, 'javemarket_bucket/productos/SERVICIOS/clases_baile.jpg', 14),
('Mantenimiento Aire Acondicionado', '1147ba9c-aa8f-4d31-9485-f1da06616b94', 'Limpieza y revisión técnica', 69900, 90, 0, 'javemarket_bucket/productos/SERVICIOS/mantenimiento_aire.jpg', 14);

-- CATEGORÍA 15 - BEBES 
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Pañales Huggies Etapa 2 x 80', '975f6eea-7842-4b01-a56e-2ac141709429', 'Pañales absorción avanzada', 39900, 60, 0, 'javemarket_bucket/productos/BEBES/panales_huggies.jpg', 15),
('Tetero Avent 260ml', '975f6eea-7842-4b01-a56e-2ac141709429', 'Tetero anticólicos BPA Free', 29900, 80, 0, 'javemarket_bucket/productos/BEBES/tetero_avent.jpg', 15),
('Cobija Coral Bebé', '975f6eea-7842-4b01-a56e-2ac141709429', 'Cobija suave para recién nacido', 24900, 65, 0, 'javemarket_bucket/productos/BEBES/cobija_bebe.jpg', 15),
('Shampoo Johnson’s Baby 400ml', '975f6eea-7842-4b01-a56e-2ac141709429', 'Shampoo suave sin lágrimas', 16900, 70, 0, 'javemarket_bucket/productos/BEBES/shampoo_johnsons.jpg', 15),
('Toallitas Húmedas Huggies x 80', '975f6eea-7842-4b01-a56e-2ac141709429', 'Toallitas libres de alcohol', 11900, 90, 0, 'javemarket_bucket/productos/BEBES/toallitas_huggies.jpg', 15),
('Enterizo Bebé Algodón', '975f6eea-7842-4b01-a56e-2ac141709429', 'Enterizo fresco de algodón', 29900, 50, 0, 'javemarket_bucket/productos/BEBES/enterizo_bebe.jpg', 15),
('Chupo Siliconado +6 meses', '975f6eea-7842-4b01-a56e-2ac141709429', 'Chupo con escudo ventilado', 12900, 100, 0, 'javemarket_bucket/productos/BEBES/chupo_silicona.jpg', 15),
('Set Cocina de Juguete Bebé', '975f6eea-7842-4b01-a56e-2ac141709429', 'Juguete educativo seguro', 34900, 40, 0, 'javemarket_bucket/productos/BEBES/set_cocina_bebe.jpg', 15),
('Talco Antialérgico 200g', '975f6eea-7842-4b01-a56e-2ac141709429', 'Talco suave para bebés', 9900, 80, 0, 'javemarket_bucket/productos/BEBES/talco_bebe.jpg', 15),
('Gimnasio de Actividades Bebé', '975f6eea-7842-4b01-a56e-2ac141709429', 'Centro de actividades educativo', 89900, 30, 0, 'javemarket_bucket/productos/BEBES/gimnasio_bebe.jpg', 15);

-- CATEGORÍA 16 - MASCOTAS
INSERT INTO productos (nombre, idProveedor, descripcion, precio, cantidadDisponible, cantidadReservada, imageUrl, idCategoria) VALUES
('Concentrado Dog Chow Adulto 4kg', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Alimento balanceado para perros adultos', 45900, 50, 0, 'javemarket_bucket/productos/MASCOTAS/dogchow_4kg.jpg', 16),
('Arena para Gatos 10kg', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Arena aglutinante premium', 29900, 60, 0, 'javemarket_bucket/productos/MASCOTAS/arena_gatos.jpg', 16),
('Collar Antipulgas Perros', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Collar protector hasta 8 meses', 19900, 70, 0, 'javemarket_bucket/productos/MASCOTAS/collar_antipulgas.jpg', 16),
('Cama Acolchada para Perro', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Cama suave tamaño mediano', 59900, 40, 0, 'javemarket_bucket/productos/MASCOTAS/cama_perro.jpg', 16),
('Pelota de Goma para Mascotas', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Pelota de goma reforzada', 9900, 90, 0, 'javemarket_bucket/productos/MASCOTAS/pelota_mascota.jpg', 16),
('Snacks para Perro x 500g', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Snacks proteínas naturales', 19900, 65, 0, 'javemarket_bucket/productos/MASCOTAS/snacks_perro.jpg', 16),
('Rascador para Gato', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Rascador vertical con cuerda sisal', 45900, 30, 0, 'javemarket_bucket/productos/MASCOTAS/rascador_gato.jpg', 16),
('Bebedero Automático Mascotas', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Bebedero 2.5L ultra silencioso', 89900, 25, 0, 'javemarket_bucket/productos/MASCOTAS/bebedero_automatico.jpg', 16),
('Arnés Ajustable para Perro', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Arnés acolchado ajustable', 34900, 55, 0, 'javemarket_bucket/productos/MASCOTAS/arnes_perro.jpg', 16),
('Kit Juguetes para Gato x 7', '17921155-b3d8-4efd-aba5-e21daf03cafb', 'Set de juguetes variados para gato', 29900, 70, 0, 'javemarket_bucket/productos/MASCOTAS/juguetes_gato_7.jpg', 16);
