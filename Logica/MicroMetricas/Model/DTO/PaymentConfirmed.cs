using System;

namespace MicroNotificaciones.Model.DTO;

public class PaymentConfirmed
{
    public Guid IdPago { get; set; }
    public Guid IdOrden { get; set; }
    public decimal Monto { get; set; }
    public string Metodo { get; set; }
    public string Estado { get; set; } // "aprobado"
    public DateTime Fecha { get; set; }
}