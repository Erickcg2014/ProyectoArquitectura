using System;

namespace MicroNotificaciones.Model.DTO;

public class OrderStatusUpdate
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string Status { get; set; } // "alistando", "entregado_transportadora", "enviado", "entregado"
    public DateTime Timestamp { get; set; }
}