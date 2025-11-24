using Microsoft.Extensions.Configuration;
using Confluent.Kafka;
using System.Text.Json;
using MicroPagos.Model.DTO;

namespace MicroPagos.Integration;

public class Send
{
    private readonly IConfiguration _config;
    private const string TOPICO = "topico_pagos";

    public Send(IConfiguration config)
    {
        _config = config;
    }

    public async Task EnviarEventoPagoConfirmado(PaymentConfirmed evento)
    {
        var kafkaConfig = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddIniFile("client.properties", optional: false)
            .Build();

        var producerConfig = new ProducerConfig
        {
            BootstrapServers = kafkaConfig["bootstrap.servers"],
            SecurityProtocol = SecurityProtocol.SaslSsl,
            SaslMechanism = SaslMechanism.Plain,
            SaslUsername = kafkaConfig["sasl.username"],
            SaslPassword = kafkaConfig["sasl.password"],
            AllowAutoCreateTopics = true
        };

        using var producer = new ProducerBuilder<string, string>(producerConfig).Build();

        try
        {
            var message = JsonSerializer.Serialize(evento);
            var result = await producer.ProduceAsync(TOPICO, new Message<string, string>
            {
                Key = evento.IdPago.ToString(),
                Value = message
            });

            Console.WriteLine($"Evento enviado a {TOPICO}: {result.Status}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error enviando evento: {ex.Message}");
        }
    }

    public async Task EnviarEventoPagoFallido(PaymentFailed evento)
    {
        // Similar al anterior, pero para PaymentFailed
        var kafkaConfig = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddIniFile("client.properties", optional: false)
            .Build();

        var producerConfig = new ProducerConfig
        {
            BootstrapServers = kafkaConfig["bootstrap.servers"],
            SecurityProtocol = SecurityProtocol.SaslSsl,
            SaslMechanism = SaslMechanism.Plain,
            SaslUsername = kafkaConfig["sasl.username"],
            SaslPassword = kafkaConfig["sasl.password"],
            AllowAutoCreateTopics = true
        };

        using var producer = new ProducerBuilder<string, string>(producerConfig).Build();

        try
        {
            var message = JsonSerializer.Serialize(evento);
            var result = await producer.ProduceAsync(TOPICO, new Message<string, string>
            {
                Key = evento.IdPago.ToString(),
                Value = message
            });

            Console.WriteLine($"Evento enviado a {TOPICO}: {result.Status}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error enviando evento: {ex.Message}");
        }
    }
}