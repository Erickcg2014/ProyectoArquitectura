package com.arquitectura.microordenes.controller;

import com.arquitectura.microordenes.dto.OrdenRequest;
import com.arquitectura.microordenes.dto.OrdenResponse;
import com.arquitectura.microordenes.service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    @PostMapping
    public ResponseEntity<OrdenResponse> crearOrden(@RequestBody OrdenRequest request) {
        OrdenResponse response = ordenService.crearOrden(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/alistando")
    public ResponseEntity<Void> marcarComoAlistando(@PathVariable UUID id) {
        ordenService.marcarComoAlistando(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/entregado-transportadora")
    public ResponseEntity<Void> marcarComoEntregadoTransportadora(@PathVariable UUID id) {
        ordenService.marcarComoEntregadoTransportadora(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/enviado")
    public ResponseEntity<Void> marcarComoEnviado(@PathVariable UUID id) {
        ordenService.marcarComoEnviada(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/entregado")
    public ResponseEntity<Void> marcarComoEntregado(@PathVariable UUID id) {
        ordenService.marcarComoEntregado(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/pago")
    public ResponseEntity<Void> actualizarEstadoPorPago(@PathVariable UUID id, @RequestParam String eventoPago) {
        ordenService.actualizarEstadoPorPago(id, eventoPago);
        return ResponseEntity.ok().build();
    }
}