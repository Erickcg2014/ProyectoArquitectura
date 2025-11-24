package com.arquitectura.micropagos.service;

import com.arquitectura.micropagos.model.Pago;
import com.arquitectura.micropagos.model.EstadoPago;
import com.arquitectura.micropagos.model.MetodoPago;
import com.arquitectura.micropagos.model.TransaccionPago;
import com.arquitectura.micropagos.repository.PagoRepository;
import com.arquitectura.micropagos.repository.TransaccionPagoRepository;
import com.arquitectura.micropagos.dto.PaymentConfirmed;
import com.arquitectura.micropagos.dto.PaymentFailed;
import com.arquitectura.micropagos.integration.PaymentGatewayClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@SuppressWarnings("null")
public class PagoService {

    private final PagoRepository pagoRepository;
    private final TransaccionPagoRepository transaccionPagoRepository;
    private final PaymentGatewayClient gatewayClient;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public PagoService(PagoRepository pagoRepository, TransaccionPagoRepository transaccionPagoRepository, PaymentGatewayClient gatewayClient, KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.pagoRepository = pagoRepository;
        this.transaccionPagoRepository = transaccionPagoRepository;
        this.gatewayClient = gatewayClient;
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public Pago iniciarPago(UUID idOrden, BigDecimal monto, String metodo) {
        try {
            EstadoPago estadoPendiente = pagoRepository.findByEstado("pendiente")
                    .orElseThrow(() -> new RuntimeException("Estado pendiente no encontrado"));
            MetodoPago metodoPago = pagoRepository.findByTipo(metodo)
                    .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));

            Pago pago = new Pago();
            pago.setId(UUID.randomUUID());
            pago.setIdOrden(idOrden);
            pago.setMonto(monto);
            pago.setFecha(LocalDateTime.now());
            pago.setIdEstadoPago(estadoPendiente.getId());
            pago.setIdMetodoPago(metodoPago.getId());

            pago = pagoRepository.save(pago);

            // Integrar con gateway
            var gatewayResponse = gatewayClient.crearPago(monto, metodo, pago.getId());

            // Crear transacción inicial
            TransaccionPago transaccion = new TransaccionPago();
            transaccion.setId(UUID.randomUUID());
            transaccion.setIdPago(pago.getId());
            transaccion.setGatewayId(gatewayResponse.getId());
            transaccion.setMonto(monto);
            transaccion.setFecha(LocalDateTime.now());

            transaccionPagoRepository.save(transaccion);

            return pago;
        } catch (Exception e) {
            throw new RuntimeException("Error al iniciar pago", e);
        }
    }

    @Transactional
    public void procesarWebhook(String gatewayId, String estado, BigDecimal monto) {
        try {
            // Buscar transacción
            TransaccionPago transaccion = transaccionPagoRepository.findByGatewayId(gatewayId)
                    .orElseThrow(() -> new RuntimeException("Transacción no encontrada"));

            Pago pago = pagoRepository.findById(transaccion.getIdPago())
                    .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

            EstadoPago nuevoEstado = pagoRepository.findByEstado(estado)
                    .orElseThrow(() -> new RuntimeException("Estado inválido"));

            pago.setIdEstadoPago(nuevoEstado.getId());
            pagoRepository.save(pago);

            // Crear transacción final
            TransaccionPago nuevaTransaccion = new TransaccionPago();
            nuevaTransaccion.setId(UUID.randomUUID());
            nuevaTransaccion.setIdPago(pago.getId());
            nuevaTransaccion.setGatewayId(gatewayId);
            nuevaTransaccion.setMonto(monto);
            nuevaTransaccion.setFecha(LocalDateTime.now());
            transaccionPagoRepository.save(nuevaTransaccion);

            // Enviar evento
            try {
                if ("aprobado".equals(estado)) {
                    PaymentConfirmed evento = new PaymentConfirmed(
                            pago.getId(), pago.getIdOrden(), pago.getMonto(),
                            pago.getMetodoPago().getTipo(), "aprobado", LocalDateTime.now());
                    String json = objectMapper.writeValueAsString(evento);
                    kafkaTemplate.send("topico_pagos", evento.getIdPago().toString(), json);
                } else if ("rechazado".equals(estado) || "fallido".equals(estado)) {
                    PaymentFailed evento = new PaymentFailed(
                            pago.getId(), pago.getIdOrden(), pago.getMonto(),
                            pago.getMetodoPago().getTipo(), estado, LocalDateTime.now(), "Error en gateway");
                    String json = objectMapper.writeValueAsString(evento);
                    kafkaTemplate.send("topico_pagos", evento.getIdPago().toString(), json);
                }
            } catch (Exception e) {
                System.err.println("Error serializando evento Kafka: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Error procesando webhook: " + e.getMessage());
            throw e;
        }
    }

    public Pago obtenerPagoPorId(UUID id) {
        return pagoRepository.findById(id).orElse(null);
    }
}