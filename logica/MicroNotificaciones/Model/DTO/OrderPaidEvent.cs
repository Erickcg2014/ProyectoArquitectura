using System;

namespace MicroNotificaciones.Model.DTO;

public class OrderPaidEvent
{
    public string Event { get; set; } // "OrderPaid"
    public Guid OrderId { get; set; }
}