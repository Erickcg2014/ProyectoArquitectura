package com.arquitectura.microordenes.service;

import com.arquitectura.microordenes.dto.OrdenRequest;
import com.arquitectura.microordenes.dto.OrdenResponse;
import com.arquitectura.microordenes.integration.OrdenIntegration;
import com.arquitectura.microordenes.model.Orden;
import com.arquitectura.microordenes.model.OrdenItem;
import com.arquitectura.microordenes.model.ResumenProveedorOrden;
import com.arquitectura.microordenes.repository.IOrdenItemRepository;
import com.arquitectura.microordenes.repository.IOrdenRepository;
import com.arquitectura.microordenes.repository.IResumenProveedorOrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrdenService {

    @Autowired
    private IOrdenRepository ordenRepository;

    @Autowired
    private IOrdenItemRepository ordenItemRepository;

    @Autowired
    private IResumenProveedorOrdenRepository resumenRepository;

    @Autowired
    private OrdenIntegration ordenIntegration;

    @Transactional
    public OrdenResponse crearOrden(OrdenRequest request) {
        // Validar datos
        if (request.getIdUsuario() == null || request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Datos inválidos para crear orden");
        }

        // Calcular total
        BigDecimal total = request.getItems().stream()
                .map(item -> BigDecimal.valueOf(item.getPrecioUnitario() * item.getCantidad()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Crear entidad Orden
        Orden orden = new Orden();
        orden.setIdUsuario(UUID.fromString(request.getIdUsuario()));
        orden.setTotal(total);
        orden.setEstado("PENDIENTE");
        orden.setDireccion(request.getDireccion().getDireccion());
        orden.setDireccionBarrio(request.getDireccion().getBarrio());
        orden.setDireccionCiudad(request.getDireccion().getCiudad());
        orden.setDireccionDepartamento(request.getDireccion().getDepartamento());
        orden.setDireccionesPais(request.getDireccion().getPais());
        orden.setCreadoEn(LocalDateTime.now());

        orden = ordenRepository.save(orden);
        final UUID ordenId = orden.getId();

        // Guardar items
        List<OrdenItem> items = request.getItems().stream().map(item -> {
            OrdenItem oi = new OrdenItem();
            oi.setIdOrden(ordenId);
            oi.setIdProducto(UUID.fromString(item.getIdProducto()));
            oi.setIdProveedor(UUID.fromString(item.getIdProveedor()));
            oi.setCantidad(item.getCantidad());
            oi.setPrecioUnitario(BigDecimal.valueOf(item.getPrecioUnitario()));
            return oi;
        }).toList();

        @SuppressWarnings("null")
        var unused = ordenItemRepository.saveAll(items);

        // Integrar con MS Inventario (validar stock) - Placeholder
        ordenIntegration.validarStock(request);

        // Integrar con MS Pagos (iniciar pago) - Placeholder
        String idPago = ordenIntegration.iniciarPago(orden.getId(), total);

        // Actualizar con idPago si aplica - Placeholder
        if (idPago != null) {
            // Asumir que hay un campo idPago en Orden, pero no está en el modelo actual
            // orden.setIdPago(UUID.fromString(idPago));
            // ordenRepository.save(orden);
        }

        // Crear resúmenes por proveedor
        var resumenes = items.stream()
                .collect(Collectors.groupingBy(OrdenItem::getIdProveedor,
                        Collectors.reducing(BigDecimal.ZERO, OrdenItem::getPrecioUnitario, BigDecimal::add)))
                .entrySet().stream().map(entry -> {
                    ResumenProveedorOrden resumen = new ResumenProveedorOrden();
                    resumen.setIdProveedor(entry.getKey());
                    resumen.setIdOrden(ordenId);
                    resumen.setTotalProveedor(entry.getValue());
                    return resumen;
                }).toList();

        @SuppressWarnings("null")
        var unused2 = resumenRepository.saveAll(resumenes);

        // Retornar datos al frontend
        return mapToResponse(orden, items, resumenes);
    }

    @Transactional
    public void actualizarEstadoPorPago(UUID idOrden, String eventoPago) {
        // Consumir evento Kafka (PaymentConfirmed / PaymentFailed)
        String nuevoEstado = "PaymentConfirmed".equals(eventoPago) ? "PAGADO" : "CANCELADO";
        ordenRepository.updateEstadoById(idOrden, nuevoEstado);

        // Si pago confirmado → producir evento OrderPaid
        if ("PAGADO".equals(nuevoEstado)) {
            ordenIntegration.producirEventoOrderPaid(idOrden);
        }
    }

    @Transactional
    public void marcarComoEnviada(UUID idOrden) {
        // Cambiar estado ENVIADA
        ordenRepository.updateEstadoById(idOrden, "ENVIADA");
    }

    private OrdenResponse mapToResponse(Orden orden, List<OrdenItem> items, List<ResumenProveedorOrden> resumenes) {
        OrdenResponse response = new OrdenResponse();
        response.setId(orden.getId().toString());
        response.setIdUsuario(orden.getIdUsuario().toString());
        response.setTotal(orden.getTotal().doubleValue());
        response.setEstado(orden.getEstado());
        response.setCreadoEn(orden.getCreadoEn());
        // Mapear items y resumenes si es necesario
        return response;
    }

}