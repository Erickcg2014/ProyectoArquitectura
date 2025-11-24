package com.arquitectura.micropagos.controller;

import com.arquitectura.micropagos.model.Pago;
import com.arquitectura.micropagos.service.PagoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pago")
public class PagoController {

    private final PagoService pagoService;

    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @PostMapping("/iniciar")
    public ResponseEntity<Map<String, Object>> iniciarPago(@RequestBody IniciarPagoRequest request) {
        Pago pago = pagoService.iniciarPago(request.getIdOrden(), request.getMonto(), request.getMetodo());
        Map<String, Object> response = Map.of(
                "idPago", pago.getId(),
                "urlPago", "https://gateway.com/pay/" + pago.getId() // Simulado
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(@RequestBody WebhookRequest request) {
        pagoService.procesarWebhook(request.getGatewayId(), request.getEstado(), request.getMonto());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtenerPago(@PathVariable UUID id) {
        Pago pago = pagoService.obtenerPagoPorId(id);
        if (pago == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pago);
    }

    public static class IniciarPagoRequest {
        private UUID idOrden;
        private BigDecimal monto;
        private String metodo;

        // Getters and Setters
        public UUID getIdOrden() { return idOrden; }
        public void setIdOrden(UUID idOrden) { this.idOrden = idOrden; }

        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { this.monto = monto; }

        public String getMetodo() { return metodo; }
        public void setMetodo(String metodo) { this.metodo = metodo; }
    }

    public static class WebhookRequest {
        private String gatewayId;
        private String estado;
        private BigDecimal monto;

        // Getters and Setters
        public String getGatewayId() { return gatewayId; }
        public void setGatewayId(String gatewayId) { this.gatewayId = gatewayId; }

        public String getEstado() { return estado; }
        public void setEstado(String estado) { this.estado = estado; }

        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { this.monto = monto; }
    }
}