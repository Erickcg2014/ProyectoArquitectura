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
}