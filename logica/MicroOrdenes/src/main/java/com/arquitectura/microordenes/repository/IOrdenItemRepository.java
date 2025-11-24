package com.arquitectura.microordenes.repository;

import com.arquitectura.microordenes.model.OrdenItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface IOrdenItemRepository extends JpaRepository<OrdenItem, Long> {

    List<OrdenItem> findByIdOrden(UUID idOrden);

}