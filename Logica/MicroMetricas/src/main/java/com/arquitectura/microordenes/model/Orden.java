package com.arquitectura.microordenes.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orden")
@Data
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "id_usuario", nullable = false)
    private UUID idUsuario;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(nullable = false, length = 150)
    private String direccion;

    @Column(name = "direccion_barrio", nullable = false, length = 100)
    private String direccionBarrio;

    @Column(name = "direccion_ciudad", nullable = false, length = 100)
    private String direccionCiudad;

    @Column(name = "direccion_departamento", nullable = false, length = 100)
    private String direccionDepartamento;

    @Column(name = "direcciones_pais", nullable = false, length = 100)
    private String direccionesPais;

    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn;

}