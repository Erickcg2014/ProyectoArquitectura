using System;

namespace MicroProducto.Model.DTO;

public class EventoPago
{
    public TransaccionPago Transaccion { get; set; }
    public List<ItemCarrito> Productos { get; set; }
    public string NombreCliente { get; set; }
    public string CorreoCliente { get; set; }
}

