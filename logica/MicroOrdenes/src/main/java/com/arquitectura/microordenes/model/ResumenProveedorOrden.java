package com.arquitectura.microordenes.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "resumen_proveedor_orden")
@Data
public class ResumenProveedorOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_proveedor", nullable = false)
    private UUID idProveedor;

    @Column(name = "id_orden", nullable = false)
    private UUID idOrden;

    @Column(name = "total_proveedor", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalProveedor;

}