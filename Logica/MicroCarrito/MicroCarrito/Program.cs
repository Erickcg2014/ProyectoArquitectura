
using MicroCarrito.Persistence;
using MicroCarrito.Repository;
using MicroCarrito.Service;
using Microsoft.EntityFrameworkCore;

namespace MicroCarrito;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContextFactory<CarritoDBContext>(
            options => options.UseNpgsql(connectionString)
        );
        
        Console.WriteLine("ConnectionString: " + connectionString);
        
        builder.Services.AddScoped<ICarritoRepository, CarritoRepository>();
        builder.Services.AddScoped<CarritoService>();
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
