package com.arquitectura.microordenes.repository;

import com.arquitectura.microordenes.model.ResumenProveedorOrden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface IResumenProveedorOrdenRepository extends JpaRepository<ResumenProveedorOrden, Long> {

    List<ResumenProveedorOrden> findByIdOrden(UUID idOrden);

    List<ResumenProveedorOrden> findByIdProveedor(UUID idProveedor);

    // TODO: Agregar métodos personalizados si es necesario

}