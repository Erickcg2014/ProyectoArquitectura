using MicroNotificaciones.Model.DTO;

namespace MicroNotificaciones.Service;

public class NotificationService
{
    private readonly EmailService _emailService;
    private readonly SmsService _smsService;

    public NotificationService(EmailService emailService, SmsService smsService)
    {
        _emailService = emailService;
        _smsService = smsService;
    }

    // Payment notifications (existing)
    public async Task HandlePaymentConfirmed(PaymentConfirmed payment)
    {
        // Assume we have user email and phone from somewhere, e.g., database or hardcoded for demo
        string userEmail = "juli.bejarano08@gmail.com"; // In real app, fetch from user service
        string userPhone = "+18777804236";

        string subject = "Pago Confirmado";
        string body = $"Su pago de {payment.Monto} con método {payment.Metodo} ha sido aprobado.";

        // Send real notifications
        await _emailService.SendEmailAsync(userEmail, subject, body);
        await _smsService.SendSmsAsync(userPhone, body);
    }

    public async Task HandlePaymentFailed(PaymentFailed payment)
    {
        string userEmail = "juli.bejarano08@gmail.com";
        string userPhone = "+18777804236";

        string subject = "Pago Fallido";
        string body = $"Su pago de {payment.Monto} con método {payment.Metodo} ha fallado. Estado: {payment.Estado}. Motivo: {payment.Motivo ?? "Desconocido"}.";

        await _emailService.SendEmailAsync(userEmail, subject, body);
        await _smsService.SendSmsAsync(userPhone, body);
    }

    // Order status notifications (new)
    public async Task HandleOrderStatusUpdate(OrderStatusUpdate orderUpdate)
    {
        string userEmail = "juli.bejarano08@gmail.com"; // In real app, fetch from user service
        string userPhone = "+18777804236";
        string orderId = orderUpdate.OrderId.ToString();

        string subject;
        string body;

        switch (orderUpdate.Status.ToLower())
        {
            case "alistando":
                subject = $"Estado de orden: {orderId}";
                body = $"Tu pedido {orderId} ya se está alistando. Pronto estará listo para envío.";
                break;
            case "entregado_transportadora":
                subject = $"Estado de orden: {orderId}";
                body = $"Tu pedido {orderId} ya fue entregado a la transportadora. Recibirás actualizaciones del envío.";
                break;
            case "enviado":
                subject = $"Estado de orden: {orderId}";
                body = $"Tu pedido {orderId} ya fue enviado. Puedes rastrear el envío con tu número de guía.";
                break;
            case "entregado":
                subject = $"Estado de orden: {orderId}";
                body = $"Tu pedido {orderId} ya fue entregado exitosamente. ¡Gracias por tu compra!";
                break;
            default:
                subject = $"Estado de orden: {orderId}";
                body = $"Tu pedido {orderId} tiene una actualización de estado: {orderUpdate.Status}";
                break;
        }

        await _emailService.SendEmailAsync(userEmail, subject, body);
        await _smsService.SendSmsAsync(userPhone, body);
    }
}