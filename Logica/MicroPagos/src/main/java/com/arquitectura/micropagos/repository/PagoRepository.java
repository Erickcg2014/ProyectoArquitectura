package com.arquitectura.micropagos.repository;

import com.arquitectura.micropagos.model.Pago;
import com.arquitectura.micropagos.model.EstadoPago;
import com.arquitectura.micropagos.model.MetodoPago;
import com.arquitectura.micropagos.model.TransaccionPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, UUID> {

    Optional<EstadoPago> findByEstado(String estado);

    Optional<MetodoPago> findByTipo(String tipo);

    Optional<TransaccionPago> findByGatewayId(String gatewayId);
}