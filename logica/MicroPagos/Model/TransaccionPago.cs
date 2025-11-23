using System;

namespace MicroPagos.Model;

public class TransaccionPago
{
    public Guid Id { get; set; }
    public Guid IdPago { get; set; }
    public string GatewayId { get; set; }
    public decimal Monto { get; set; }
    public DateTime Fecha { get; set; }

    // Navegación
    public Pago Pago { get; set; }
}