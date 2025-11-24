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

        // Subscribe to both topics
        consumer.Subscribe(new[] { _config["Kafka:Topic"], "topico_ordenes" });

        _logger.LogInformation($"Kafka consumer started for topics: {_config["Kafka:Topic"]}, topico_ordenes");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var consumeResult = consumer.Consume(stoppingToken);
                if (consumeResult.Message != null)
                {
                    var message = consumeResult.Message.Value;
                    var topic = consumeResult.Topic;

                    _logger.LogInformation($"Received message from topic '{topic}': {message}");

                    if (topic == _config["Kafka:Topic"])
                    {
                        // Handle payment events
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
                    else if (topic == "topico_ordenes")
                    {
                        // Handle order status update events
                        var orderEvent = JsonSerializer.Deserialize<OrderStatusUpdate>(message);
                        if (orderEvent != null)
                        {
                            await _notificationService.HandleOrderStatusUpdate(orderEvent);
                        }
                        else
                        {
                            // Handle legacy order events (like OrderPaid)
                            var orderPaidEvent = JsonSerializer.Deserialize<OrderPaidEvent>(message);
                            if (orderPaidEvent != null && orderPaidEvent.Event == "OrderPaid")
                            {
                                // Convert to order status update
                                var statusUpdate = new OrderStatusUpdate
                                {
                                    OrderId = orderPaidEvent.OrderId,
                                    UserId = Guid.Empty, // Would need to fetch from order service
                                    Status = "alistando", // First status after payment
                                    Timestamp = DateTime.UtcNow
                                };
                                await _notificationService.HandleOrderStatusUpdate(statusUpdate);
                            }
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