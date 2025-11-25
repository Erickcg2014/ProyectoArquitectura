using System;

namespace MicroCarrito.Model;

public class CarritoItem
{
    public int Id {get; set;}
    public int IdCarrito {get; set;}
    public Guid IdProducto {get; set;}
    public int Cantidad {get; set;}
    public string Descripcion {get; set;}
    public double PrecioUnitario {get; set;}
}
