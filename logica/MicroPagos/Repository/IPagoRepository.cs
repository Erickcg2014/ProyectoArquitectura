using MicroPagos.Model;

namespace MicroPagos.Repository;

public interface IPagoRepository
{
    Task<Pago> ObtenerPagoPorId(Guid id);
    Task<Pago> CrearPago(Pago pago);
    Task ActualizarPago(Pago pago);
    Task<EstadoPago> ObtenerEstadoPorNombre(string estado);
    Task<MetodoPago> ObtenerMetodoPorNombre(string tipo);
    Task<TransaccionPago> CrearTransaccion(TransaccionPago transaccion);
    Task<TransaccionPago> ObtenerTransaccionPorGatewayId(string gatewayId);
}