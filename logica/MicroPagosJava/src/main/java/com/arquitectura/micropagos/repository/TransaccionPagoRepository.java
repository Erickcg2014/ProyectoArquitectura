package com.arquitectura.micropagos.repository;

import com.arquitectura.micropagos.model.TransaccionPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransaccionPagoRepository extends JpaRepository<TransaccionPago, UUID> {

    Optional<TransaccionPago> findByGatewayId(String gatewayId);
}