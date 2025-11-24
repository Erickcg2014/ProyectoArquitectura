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

    public async Task HandlePaymentConfirmed(PaymentConfirmed payment)
    {
        // Assume we have user email and phone from somewhere, e.g., database or hardcoded for demo
        string userEmail = "user@example.com"; // In real app, fetch from user service
        string userPhone = "+1234567890";

        string subject = "Pago Confirmado";
        string body = $"Su pago de {payment.Monto} con método {payment.Metodo} ha sido aprobado.";

        await _emailService.SendEmailAsync(userEmail, subject, body);
        await _smsService.SendSmsAsync(userPhone, body);
    }

    public async Task HandlePaymentFailed(PaymentFailed payment)
    {
        string userEmail = "user@example.com";
        string userPhone = "+1234567890";

        string subject = "Pago Fallido";
        string body = $"Su pago de {payment.Monto} con método {payment.Metodo} ha fallado. Estado: {payment.Estado}. Motivo: {payment.Motivo ?? "Desconocido"}.";

        await _emailService.SendEmailAsync(userEmail, subject, body);
        await _smsService.SendSmsAsync(userPhone, body);
    }
}