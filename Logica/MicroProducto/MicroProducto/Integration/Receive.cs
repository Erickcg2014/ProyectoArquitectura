using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Confluent.Kafka;
using System.Text.Json;
using MicroProducto.Model.DTO;
using MicroProducto.Service;

namespace MicroProducto.Integration;

public class Receive : BackgroundService
{
    private readonly IConfiguration _config;
    private readonly IServiceScopeFactory _scopeFactory;
    private const string TOPICO = "topico_pagos";

    public Receive(IConfiguration config, IServiceScopeFactory scopeFactory)
    {
        _config = config;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // ⏱ ESPERAR a que la app esté lista antes de iniciar Kafka
        await Task.Delay(2000, stoppingToken); // 2 segundos de gracia
        
        Console.WriteLine("🔄 Iniciando consumidor Kafka...");

        var kafkaConfig = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddIniFile("client.properties", optional: false)
            .Build();

        var consumerConfig = new ConsumerConfig
        {
            BootstrapServers = kafkaConfig["bootstrap.servers"],
            SecurityProtocol = SecurityProtocol.SaslSsl,
            SaslMechanism = SaslMechanism.Plain,
            SaslUsername = kafkaConfig["sasl.username"],
            SaslPassword = kafkaConfig["sasl.password"],
            GroupId = "cg-pagos",
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = true,
            AllowAutoCreateTopics = true
        };

        using var consumer = new ConsumerBuilder<string, string>(consumerConfig).Build();

        try
        {
            consumer.Subscribe(TOPICO);
            Console.WriteLine("📡 Kafka conectado. Escuchando eventos...");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error al conectar Kafka: {ex.Message}");
            return;
        }

        // Loop de consumo con timeout más largo
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // ⏱ Timeout de 1 segundo (más eficiente que 100ms)
                var cr = consumer.Consume(TimeSpan.FromSeconds(1));
                
                if (cr == null || cr.Message?.Value == null)
                    continue;

                Console.WriteLine($"📥 Evento recibido: {cr.Message.Value}");

                var evento = JsonSerializer.Deserialize<EventoPago>(cr.Message.Value);

                if (evento == null)
                {
                    Console.WriteLine("⚠ Evento inválido, ignorado.");
                    continue;
                }

                await ProcesarInventario(evento);
            }
            catch (ConsumeException ex)
            {
                Console.WriteLine($"⚠ Error en Kafka consume: {ex.Error.Reason}");
                await Task.Delay(5000, stoppingToken); // Esperar antes de reintentar
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error procesando Kafka: {ex.Message}");
                await Task.Delay(1000, stoppingToken);
            }
        }
        
        consumer.Close();
        Console.WriteLine("🛑 Consumidor Kafka detenido.");
    }

    private async Task ProcesarInventario(EventoPago evento)
    {
        using var scope = _scopeFactory.CreateScope();
        var servicio = scope.ServiceProvider.GetRequiredService<ProductoService>();

        if (evento.Productos == null)
        {
            Console.WriteLine("⚠ Evento sin productos.");
            return;
        }

        Console.WriteLine("🛠 Actualizando inventario...");

        foreach (var item in evento.Productos)
        {
            var producto = await servicio.ObtenerProductoPorId(item.IdProducto);

            if (producto == null)
            {
                Console.WriteLine($"⚠ Producto {item.IdProducto} no existe.");
                continue;
            }

            int nuevaCantidad = producto.CantidadDisponible - item.Cantidad;

            await servicio.ActualizarCantidadProducto(item.IdProducto, nuevaCantidad);

            Console.WriteLine($"   ✅ Producto {item.IdProducto}: descontado {item.Cantidad} unidades");
        }

        Console.WriteLine("✔ Inventario actualizado.");
    }
}