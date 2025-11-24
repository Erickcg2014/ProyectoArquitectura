package com.arquitectura.microordenes.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrdenResponse {

    private String id;
    private String idUsuario;
    private double total;
    private String estado;
    private DireccionResponse direccion;
    private LocalDateTime creadoEn;
    private List<OrdenItemResponse> items;

    @Data
    public static class OrdenItemResponse {
        private String idProducto;
        private String idProveedor;
        private int cantidad;
        private double precioUnitario;
    }

    @Data
    public static class DireccionResponse {
        private String direccion;
        private String barrio;
        private String ciudad;
        private String departamento;
        private String pais;
    }

}