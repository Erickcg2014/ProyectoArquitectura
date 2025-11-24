using System;

namespace MicroCarrito.Model;

public class Carrito
{
    public int Id {get; set;}
    public int IdUsuario {get; set;}
    public double PrecioTotal {get; set;}
    public DateTime FechaActualizacion {get; set;}

}
