using System;

namespace MicroProducto.Model.DTO;

public class CrearProductoRequest
{
    public Producto Producto { get; set; }
    public string? CategoriaNombre { get; set; }
}

