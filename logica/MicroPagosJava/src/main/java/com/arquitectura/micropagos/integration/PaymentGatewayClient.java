package com.arquitectura.micropagos.integration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Component
public class PaymentGatewayClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String apiKey;

    public PaymentGatewayClient(RestTemplate restTemplate,
                                @Value("${payment.gateway.base-url}") String baseUrl,
                                @Value("${payment.gateway.api-key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public GatewayResponse crearPago(BigDecimal monto, String metodo, UUID idPago) {
        String url = baseUrl + "/payment_intents";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        Map<String, Object> body = Map.of(
                "amount", monto.multiply(BigDecimal.valueOf(100)).longValue(), // Centavos
                "currency", "usd",
                "payment_method_types", new String[]{metodo},
                "metadata", Map.of("order_id", idPago.toString())
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<GatewayResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, GatewayResponse.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error creando pago en gateway", e);
        }
    }

    public boolean confirmarPago(String paymentIntentId) {
        String url = baseUrl + "/payment_intents/" + paymentIntentId + "/confirm";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.POST, entity, Void.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            throw new RuntimeException("Error confirmando pago", e);
        }
    }

    public static class GatewayResponse {
        private String id;
        private String clientSecret;
        private String status;

        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getClientSecret() { return clientSecret; }
        public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}