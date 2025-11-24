using MicroNotificaciones.Integration;
using MicroNotificaciones.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MicroNotificaciones;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Register services
        builder.Services.AddScoped<EmailService>();
        builder.Services.AddScoped<SmsService>();
        builder.Services.AddScoped<NotificationService>();

        // Kafka consumer as background service
        builder.Services.AddHostedService<KafkaConsumerService>();

        // Configure port
        builder.WebHost.UseUrls("http://0.0.0.0:8082");

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}