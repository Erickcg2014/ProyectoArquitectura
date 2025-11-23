using System;

namespace MicroProducto.Model.DTO;

public class CrearProductoRequest
{
    public CreacionProducto Producto { get; set; }
    public string? CategoriaNombre { get; set; }
}

