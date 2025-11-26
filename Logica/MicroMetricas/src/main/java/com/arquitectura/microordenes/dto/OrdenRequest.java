package com.arquitectura.microordenes.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrdenRequest {

    private String idUsuario;
    private List<OrdenItemRequest> items;
    private DireccionRequest direccion;

    @Data
    public static class OrdenItemRequest {
        private String idProducto;
        private String idProveedor;
        private int cantidad;
        private double precioUnitario;
    }

    @Data
    public static class DireccionRequest {
        private String direccion;
        private String barrio;
        private String ciudad;
        private String departamento;
        private String pais;
    }

}