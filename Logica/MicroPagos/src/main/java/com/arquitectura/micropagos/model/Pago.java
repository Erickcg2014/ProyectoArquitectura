package com.arquitectura.micropagos.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "id_orden", nullable = false)
    private UUID idOrden;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(name = "id_estado_pago", nullable = false)
    private Integer idEstadoPago;

    @Column(name = "id_metodo_pago", nullable = false)
    private Integer idMetodoPago;

    @ManyToOne
    @JoinColumn(name = "id_estado_pago", insertable = false, updatable = false)
    private EstadoPago estadoPago;

    @ManyToOne
    @JoinColumn(name = "id_metodo_pago", insertable = false, updatable = false)
    private MetodoPago metodoPago;

    @OneToMany(mappedBy = "pago")
    private List<TransaccionPago> transacciones;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getIdOrden() { return idOrden; }
    public void setIdOrden(UUID idOrden) { this.idOrden = idOrden; }

    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public Integer getIdEstadoPago() { return idEstadoPago; }
    public void setIdEstadoPago(Integer idEstadoPago) { this.idEstadoPago = idEstadoPago; }

    public Integer getIdMetodoPago() { return idMetodoPago; }
    public void setIdMetodoPago(Integer idMetodoPago) { this.idMetodoPago = idMetodoPago; }

    public EstadoPago getEstadoPago() { return estadoPago; }
    public void setEstadoPago(EstadoPago estadoPago) { this.estadoPago = estadoPago; }

    public MetodoPago getMetodoPago() { return metodoPago; }
    public void setMetodoPago(MetodoPago metodoPago) { this.metodoPago = metodoPago; }

    public List<TransaccionPago> getTransacciones() { return transacciones; }
    public void setTransacciones(List<TransaccionPago> transacciones) { this.transacciones = transacciones; }
}