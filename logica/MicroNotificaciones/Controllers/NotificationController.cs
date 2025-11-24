using Microsoft.AspNetCore.Mvc;
using MicroNotificaciones.Service;
using MicroNotificaciones.Model.DTO;

namespace MicroNotificaciones.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly NotificationService _notificationService;

    public NotificationController(NotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    // Payment notification endpoints
    [HttpPost("test-payment-confirmed")]
    public async Task<IActionResult> TestPaymentConfirmed([FromBody] PaymentConfirmed payment)
    {
        await _notificationService.HandlePaymentConfirmed(payment);
        return Ok("Notification sent for payment confirmed");
    }

    [HttpPost("test-payment-failed")]
    public async Task<IActionResult> TestPaymentFailed([FromBody] PaymentFailed payment)
    {
        await _notificationService.HandlePaymentFailed(payment);
        return Ok("Notification sent for payment failed");
    }

    // Order status notification endpoints
    [HttpPost("test-order-status")]
    public async Task<IActionResult> TestOrderStatusUpdate([FromBody] OrderStatusUpdate orderUpdate)
    {
        await _notificationService.HandleOrderStatusUpdate(orderUpdate);
        return Ok($"Notification sent for order status: {orderUpdate.Status}");
    }

    [HttpPost("test-order-alistando")]
    public async Task<IActionResult> TestOrderAlistando([FromQuery] string orderId)
    {
        var orderUpdate = new OrderStatusUpdate
        {
            OrderId = Guid.Parse(orderId),
            UserId = Guid.NewGuid(), // Placeholder
            Status = "alistando",
            Timestamp = DateTime.UtcNow
        };
        await _notificationService.HandleOrderStatusUpdate(orderUpdate);
        return Ok("Notification sent: Tu pedido ya se está alistando");
    }

    [HttpPost("test-order-transportadora")]
    public async Task<IActionResult> TestOrderTransportadora([FromQuery] string orderId)
    {
        var orderUpdate = new OrderStatusUpdate
        {
            OrderId = Guid.Parse(orderId),
            UserId = Guid.NewGuid(), // Placeholder
            Status = "entregado_transportadora",
            Timestamp = DateTime.UtcNow
        };
        await _notificationService.HandleOrderStatusUpdate(orderUpdate);
        return Ok("Notification sent: Tu pedido ya fue entregado a la transportadora");
    }

    [HttpPost("test-order-enviado")]
    public async Task<IActionResult> TestOrderEnviado([FromQuery] string orderId)
    {
        var orderUpdate = new OrderStatusUpdate
        {
            OrderId = Guid.Parse(orderId),
            UserId = Guid.NewGuid(), // Placeholder
            Status = "enviado",
            Timestamp = DateTime.UtcNow
        };
        await _notificationService.HandleOrderStatusUpdate(orderUpdate);
        return Ok("Notification sent: Tu pedido ya fue enviado");
    }

    [HttpPost("test-order-entregado")]
    public async Task<IActionResult> TestOrderEntregado([FromQuery] string orderId)
    {
        var orderUpdate = new OrderStatusUpdate
        {
            OrderId = Guid.Parse(orderId),
            UserId = Guid.NewGuid(), // Placeholder
            Status = "entregado",
            Timestamp = DateTime.UtcNow
        };
        await _notificationService.HandleOrderStatusUpdate(orderUpdate);
        return Ok("Notification sent: Tu pedido ya fue entregado");
    }
}