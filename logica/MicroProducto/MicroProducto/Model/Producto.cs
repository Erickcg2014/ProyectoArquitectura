using System;
using Confluent.Kafka;

namespace MicroProducto.Model;

public class Producto
{
    public Guid Id {get; set;}
    public string Nombre {get; set;}
    public string Descripcion {get; set;}
    public int CantidadDisponible {get; set;}
    public double Precio {get; set;}
    public int ?Categoria {get; set;}
    public string ?ImagenUrl {get; set;}
    public Guid IdProveedor { get; set;}
    public int CantidadReservada {get; set;}

}
