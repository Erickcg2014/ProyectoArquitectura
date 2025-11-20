
using MicroProducto.Persistence;
using MicroProducto.Repository;
using MicroProducto.Service;
using Microsoft.EntityFrameworkCore;

namespace MicroProducto;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContextFactory<ProductoDBContext>(
            options => options.UseNpgsql(connectionString)
        );
        
        Console.WriteLine("ConnectionString: " + connectionString);


        builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
        builder.Services.AddScoped<ProductoService>();
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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
