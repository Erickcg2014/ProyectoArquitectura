using System;

namespace MicroCarrito.Model;

public class CarritoItem
{
    public int Id {get; set;}
    public int Id_producto {get; set;}
    public int Cantidad {get; set; }
    public string Descripcion {get; set;}
    public int Id_usuario {get; set;}
    public double Precio {get; set;}
}
