package com.arquitectura.microordenes.integration;

import com.arquitectura.microordenes.dto.OrdenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class OrdenIntegration {

    @SuppressWarnings("unused")
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${microinventario.url}")
    private String microInventarioUrl;

    @Value("${micropagos.url}")
    private String microPagosUrl;

    // Integrar con MS Inventario (validar stock)
    public void validarStock(OrdenRequest request) {
        String url = microInventarioUrl + "/validar-stock";
        // Asumir que el endpoint espera una lista de items
        Map<String, Object> payload = new HashMap<>();
        payload.put("items", request.getItems());
        // restTemplate.postForObject(url, payload, Void.class);
        // Placeholder: Simular validación exitosa
        System.out.println("Stock validado para orden via HTTP a " + url);
    }

    // Integrar con MS Pagos (iniciar pago)
    public String iniciarPago(UUID idOrden, BigDecimal total) {
        String url = microPagosUrl + "/iniciar";
        Map<String, Object> payload = new HashMap<>();
        payload.put("idOrden", idOrden.toString());
        payload.put("total", total);
        // String response = restTemplate.postForObject(url, payload, String.class);
        // Placeholder: Retornar un idPago simulado
        String idPago = UUID.randomUUID().toString();
        System.out.println("Pago iniciado para orden " + idOrden + " via HTTP a " + url + ", idPago: " + idPago);
        return idPago;
    }

    // Producir evento OrderPaid
    public void producirEventoOrderPaid(UUID idOrden) {
        String topic = "ordenes";
        String message = "{\"event\": \"OrderPaid\", \"orderId\": \"" + idOrden + "\"}";
        kafkaTemplate.send(topic, message);
        System.out.println("Evento OrderPaid enviado a Kafka topic 'ordenes': " + message);
    }

}