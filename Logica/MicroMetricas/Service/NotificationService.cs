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
        // TODO: Get user email and phone from user service
        string userEmail = "user@example.com"; // Placeholder
        string userPhone = "+1234567890"; // Placeholder

        // Send email notification
        await _emailService.SendEmailAsync(
            userEmail,
            "Pago Confirmado",
            $"Su pago de ${payment.Monto} ha sido confirmado. ID de transacción: {payment.IdPago}"
        );

        // Send SMS notification
        await _smsService.SendSmsAsync(
            userPhone,
            $"Pago confirmado por ${payment.Monto}. Transacción: {payment.IdPago}"
        );
    }

    public async Task HandlePaymentFailed(PaymentFailed payment)
    {
        // TODO: Get user email and phone from user service
        string userEmail = "user@example.com"; // Placeholder
        string userPhone = "+1234567890"; // Placeholder

        // Send email notification
        await _emailService.SendEmailAsync(
            userEmail,
            "Pago Fallido",
            $"Su pago de ${payment.Monto} ha fallado. Razón: {payment.Motivo}. ID de transacción: {payment.IdPago}"
        );

        // Send SMS notification
        await _smsService.SendSmsAsync(
            userPhone,
            $"Pago fallido por ${payment.Monto}. Razón: {payment.Motivo}"
        );
    }
}