using System;

namespace MicroProducto.Model.DTO;

public class ItemCarrito
{
    public Guid IdProducto { get; set; }
    public int Cantidad { get; set; }
}
