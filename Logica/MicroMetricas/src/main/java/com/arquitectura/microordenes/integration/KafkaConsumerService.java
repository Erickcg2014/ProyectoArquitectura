package com.arquitectura.microordenes.integration;

import com.arquitectura.microordenes.service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class KafkaConsumerService {

    @Autowired
    private OrdenService ordenService;

    @KafkaListener(topics = "pagos", groupId = "ordenes-group")
    public void listenPaymentEvents(String message) {
        // Asumir mensaje JSON simple: {"event": "PaymentConfirmed", "orderId": "uuid"}
        // En producción, usar Jackson para parsear
        if (message.contains("PaymentConfirmed")) {
            String orderIdStr = extractOrderId(message);
            UUID orderId = UUID.fromString(orderIdStr);
            ordenService.actualizarEstadoPorPago(orderId, "PaymentConfirmed");
        } else if (message.contains("PaymentFailed")) {
            String orderIdStr = extractOrderId(message);
            UUID orderId = UUID.fromString(orderIdStr);
            ordenService.actualizarEstadoPorPago(orderId, "PaymentFailed");
        }
    }

    private String extractOrderId(String message) {
        // Simple extraction, replace with JSON parsing
        int start = message.indexOf("\"orderId\": \"") + 12;
        int end = message.indexOf("\"", start);
        return message.substring(start, end);
    }

}