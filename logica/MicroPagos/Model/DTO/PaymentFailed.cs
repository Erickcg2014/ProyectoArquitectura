using System;

namespace MicroPagos.Model.DTO;

public class PaymentFailed
{
    public Guid IdPago { get; set; }
    public Guid IdOrden { get; set; }
    public decimal Monto { get; set; }
    public string Metodo { get; set; }
    public string Estado { get; set; } // "rechazado" o "fallido"
    public DateTime Fecha { get; set; }
    public string Motivo { get; set; } // Opcional: razón del fallo
}