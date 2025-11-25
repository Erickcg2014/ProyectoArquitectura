using MicroProducto.Integration;
using MicroProducto.Persistence;
using MicroProducto.Repository;
using MicroProducto.Service;
using Microsoft.EntityFrameworkCore;

namespace MicroProducto;

public class Program
{
    public static void Main(string[] args)
    {
        try
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContextFactory<ProductoDBContext>(
                options => options.UseNpgsql(connectionString)
            );
            
            Console.WriteLine("📊 ConnectionString configurada");

            builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
            builder.Services.AddScoped<ProductoService>();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            // Kafka consumer en background
            builder.Services.AddHostedService<Receive>();
            builder.WebHost.UseUrls("http://0.0.0.0:8083");

            // CORS ELIMINADO COMPLETAMENTE

            var app = builder.Build();
            // CORS ELIMINADO COMPLETAMENTE

           // if (app.Environment.IsDevelopment())
            //{
                app.UseSwagger();
                app.UseSwaggerUI();
           // }

            //app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            Console.WriteLine("🚀 API iniciando...");
            app.Run();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"💥 Error fatal: {ex.Message}");
            throw;
        }
    }
}