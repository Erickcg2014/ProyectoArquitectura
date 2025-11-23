using MicroPagos.Model;
using MicroPagos.Model.DTO;
using MicroPagos.Repository;
using MicroPagos.Integration;

namespace MicroPagos.Service;

public class PagoService
{
    private readonly IPagoRepository _repository;
    private readonly Send _send;
    private readonly PaymentGatewayClient _gatewayClient;

    public PagoService(IPagoRepository repository, Send send, PaymentGatewayClient gatewayClient)
    {
        _repository = repository;
        _send = send;
        _gatewayClient = gatewayClient;
    }

    public async Task<Pago> IniciarPago(Guid idOrden, decimal monto, string metodo)
    {
        try
        {
            var estadoPendiente = await _repository.ObtenerEstadoPorNombre("pendiente");
            var metodoPago = await _repository.ObtenerMetodoPorNombre(metodo);

            var pago = new Pago
            {
                Id = Guid.NewGuid(),
                IdOrden = idOrden,
                Monto = monto,
                Fecha = DateTime.UtcNow,
                IdEstadoPago = estadoPendiente.Id,
                IdMetodoPago = metodoPago.Id
            };

            await _repository.CrearPago(pago);

            // Integrar con gateway
            var gatewayResponse = await _gatewayClient.CrearPago(monto, metodo, pago.Id);

            // Crear transacción inicial
            var transaccion = new TransaccionPago
            {
                Id = Guid.NewGuid(),
                IdPago = pago.Id,
                GatewayId = gatewayResponse.Id,
                Monto = monto,
                Fecha = DateTime.UtcNow
            };
            await _repository.CrearTransaccion(transaccion);

            return pago;
        }
        catch (Exception ex)
        {
            // Manejar error: marcar pago como fallido o loggear
            throw new Exception("Error al iniciar pago", ex);
        }
    }

    public async Task ProcesarWebhook(string gatewayId, string estado, decimal monto)
    {
        try
        {
            // Validar firma del webhook (simulado)
            // if (!ValidarFirma(request)) throw new Exception("Firma inválida");

            // Buscar transacción por gatewayId
            var transaccion = await _repository.ObtenerTransaccionPorGatewayId(gatewayId);
            if (transaccion == null)
            {
                throw new Exception("Transacción no encontrada");
            }

            var pago = await _repository.ObtenerPagoPorId(transaccion.IdPago);
            if (pago == null)
            {
                throw new Exception("Pago no encontrado");
            }

            var nuevoEstado = await _repository.ObtenerEstadoPorNombre(estado);
            if (nuevoEstado == null)
            {
                throw new Exception("Estado inválido");
            }

            pago.IdEstadoPago = nuevoEstado.Id;
            await _repository.ActualizarPago(pago);

            // Crear nueva transacción final
            var nuevaTransaccion = new TransaccionPago
            {
                Id = Guid.NewGuid(),
                IdPago = pago.Id,
                GatewayId = gatewayId,
                Monto = monto,
                Fecha = DateTime.UtcNow
            };
            await _repository.CrearTransaccion(nuevaTransaccion);

            // Enviar evento
            if (estado == "aprobado")
            {
                var evento = new PaymentConfirmed
                {
                    IdPago = pago.Id,
                    IdOrden = pago.IdOrden,
                    Monto = pago.Monto,
                    Metodo = pago.MetodoPago.Tipo,
                    Estado = "aprobado",
                    Fecha = DateTime.UtcNow
                };
                await _send.EnviarEventoPagoConfirmado(evento);
            }
            else if (estado == "rechazado" || estado == "fallido")
            {
                var evento = new PaymentFailed
                {
                    IdPago = pago.Id,
                    IdOrden = pago.IdOrden,
                    Monto = pago.Monto,
                    Metodo = pago.MetodoPago.Tipo,
                    Estado = estado,
                    Fecha = DateTime.UtcNow
                };
                await _send.EnviarEventoPagoFallido(evento);
            }
        }
        catch (Exception ex)
        {
            // Loggear error y no procesar
            Console.WriteLine($"Error procesando webhook: {ex.Message}");
            throw;
        }
    }

    public async Task<Pago> ObtenerPagoPorId(Guid id)
    {
        return await _repository.ObtenerPagoPorId(id);
    }
}