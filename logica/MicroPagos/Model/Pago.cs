using System;

namespace MicroPagos.Model;

public class Pago
{
    public Guid Id { get; set; }
    public Guid IdOrden { get; set; }
    public decimal Monto { get; set; }
    public DateTime Fecha { get; set; }
    public int IdEstadoPago { get; set; }
    public int IdMetodoPago { get; set; }

    // Navegación
    public EstadoPago EstadoPago { get; set; }
    public MetodoPago MetodoPago { get; set; }
    public ICollection<TransaccionPago> Transacciones { get; set; }
}