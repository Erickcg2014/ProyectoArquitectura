using MailKit.Net.Smtp;
using MimeKit;

namespace MicroNotificaciones.Service;

public class EmailService
{
    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Notification Service", "javemarketenterprise3@gmail.com"));
        message.To.Add(new MailboxAddress("", toEmail));
        message.Subject = subject;

        message.Body = new TextPart("plain")
        {
            Text = body
        };

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync("javemarketenterprise3@gmail.com", "mmvo cbpp jtnh lmrr");
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}