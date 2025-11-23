using Microsoft.EntityFrameworkCore;
using MicroPagos.Model;

namespace MicroPagos.Persistence;

public class PagoDBContext : DbContext
{
    public PagoDBContext(DbContextOptions<PagoDBContext> options) : base(options) { }

    public DbSet<Pago> Pagos { get; set; }
    public DbSet<EstadoPago> EstadosPago { get; set; }
    public DbSet<MetodoPago> MetodosPago { get; set; }
    public DbSet<TransaccionPago> TransaccionesPago { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuraciones adicionales si es necesario
        base.OnModelCreating(modelBuilder);
    }
}