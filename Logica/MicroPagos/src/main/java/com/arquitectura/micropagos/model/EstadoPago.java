package com.arquitectura.micropagos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "estado_pago")
public class EstadoPago {

    @Id
    private Integer id;

    @Column(nullable = false, unique = true)
    private String estado;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}