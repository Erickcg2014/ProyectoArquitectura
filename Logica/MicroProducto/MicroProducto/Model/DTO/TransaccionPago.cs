using System;

namespace MicroProducto.Model.DTO;

public class TransaccionPago
{
    public int Id { get; set; }
    public int IdPago { get; set; }
    public string Gateway { get; set; }
    public double Monto { get; set; }
    public DateTime Fecha { get; set; }
}

