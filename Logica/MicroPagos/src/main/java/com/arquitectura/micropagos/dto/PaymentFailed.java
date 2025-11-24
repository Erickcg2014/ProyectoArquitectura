package com.arquitectura.micropagos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class PaymentFailed {

    private UUID idPago;
    private UUID idOrden;
    private BigDecimal monto;
    private String metodo;
    private String estado;
    private LocalDateTime fecha;
    private String motivo;

    // Constructor
    public PaymentFailed() {}

    public PaymentFailed(UUID idPago, UUID idOrden, BigDecimal monto, String metodo, String estado, LocalDateTime fecha, String motivo) {
        this.idPago = idPago;
        this.idOrden = idOrden;
        this.monto = monto;
        this.metodo = metodo;
        this.estado = estado;
        this.fecha = fecha;
        this.motivo = motivo;
    }

    // Getters and Setters
    public UUID getIdPago() { return idPago; }
    public void setIdPago(UUID idPago) { this.idPago = idPago; }

    public UUID getIdOrden() { return idOrden; }
    public void setIdOrden(UUID idOrden) { this.idOrden = idOrden; }

    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }

    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
}