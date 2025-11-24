using MicroPagos.Model;
using MicroPagos.Persistence;

namespace MicroPagos.Repository;

public class PagoRepository : IPagoRepository
{
    private readonly PagoDBContext _context;

    public PagoRepository(PagoDBContext context)
    {
        _context = context;
    }

    public async Task<Pago> ObtenerPagoPorId(Guid id)
    {
        return await _context.Pagos
            .Include(p => p.EstadoPago)
            .Include(p => p.MetodoPago)
            .Include(p => p.Transacciones)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Pago> CrearPago(Pago pago)
    {
        _context.Pagos.Add(pago);
        await _context.SaveChangesAsync();
        return pago;
    }

    public async Task ActualizarPago(Pago pago)
    {
        _context.Pagos.Update(pago);
        await _context.SaveChangesAsync();
    }

    public async Task<EstadoPago> ObtenerEstadoPorNombre(string estado)
    {
        return await _context.EstadosPago.FirstOrDefaultAsync(e => e.Estado == estado);
    }

    public async Task<MetodoPago> ObtenerMetodoPorNombre(string tipo)
    {
        return await _context.MetodosPago.FirstOrDefaultAsync(m => m.Tipo == tipo);
    }

    public async Task<TransaccionPago> CrearTransaccion(TransaccionPago transaccion)
    {
        _context.TransaccionesPago.Add(transaccion);
        await _context.SaveChangesAsync();
        return transaccion;
    }

    public async Task<TransaccionPago> ObtenerTransaccionPorGatewayId(string gatewayId)
    {
        return await _context.TransaccionesPago.FirstOrDefaultAsync(t => t.GatewayId == gatewayId);
    }
}