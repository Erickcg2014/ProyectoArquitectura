package com.arquitectura.microordenes.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "orden_item")
@Data
public class OrdenItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_orden", nullable = false)
    private UUID idOrden;

    @Column(name = "id_producto", nullable = false)
    private UUID idProducto;

    @Column(name = "id_proveedor", nullable = false)
    private UUID idProveedor;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

}