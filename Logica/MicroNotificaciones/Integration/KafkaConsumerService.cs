using Microsoft.Extensions.Configuration;
using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using MicroNotificaciones.Model.DTO;
using MicroNotificaciones.Service;

namespace MicroNotificaciones.Integration;

public class KafkaConsumerService : BackgroundService
{
    private readonly ILogger<KafkaConsumerService> _logger;
    private readonly IConfiguration _config;
    private readonly NotificationService _notificationService;

    public KafkaConsumerService(ILogger<KafkaConsumerService> logger, IConfiguration config, NotificationService notificationService)
    {
        _logger = logger;
        _config = config;
        _notificationService = notificationService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
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
            GroupId = "notification-service-group",
            AutoOffsetReset = AutoOffsetReset.Earliest
        };

        using var consumer = new ConsumerBuilder<string, string>(consumerConfig).Build();
        consumer.Subscribe("kafka.pagos");

        _logger.LogInformation("Kafka consumer started for topic kafka.pagos");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var consumeResult = consumer.Consume(stoppingToken);
                if (consumeResult.Message != null)
                {
                    var message = consumeResult.Message.Value;
                    _logger.LogInformation($"Received message: {message}");

                    // Deserialize and handle
                    var paymentEvent = JsonSerializer.Deserialize<PaymentConfirmed>(message);
                    if (paymentEvent != null && paymentEvent.Estado == "aprobado")
                    {
                        await _notificationService.HandlePaymentConfirmed(paymentEvent);
                    }
                    else
                    {
                        var failedEvent = JsonSerializer.Deserialize<PaymentFailed>(message);
                        if (failedEvent != null)
                        {
                            await _notificationService.HandlePaymentFailed(failedEvent);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error consuming message: {ex.Message}");
            }
        }
    }
}