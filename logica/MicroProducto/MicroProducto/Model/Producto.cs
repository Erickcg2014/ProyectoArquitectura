using System;

namespace MicroProducto.Model;

public class Producto
{
    public int Id {get; set;}
    public string Nombre {get; set;}
    public string Descripcion {get; set;}
    public int Cantidad {get; set;}
    public double Precio {get; set;}
    public string Categoria {get; set;}
    public string ?ImagenUrl {get; set;}
    public int IdProveedor { get; set;}

}
