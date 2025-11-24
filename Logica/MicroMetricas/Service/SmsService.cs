using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace MicroNotificaciones.Service;

public class SmsService
{
    public SmsService()
    {
        // Initialize Twilio with credentials from environment variables
        var accountSid = Environment.GetEnvironmentVariable("Sms__AccountSid");
        var authToken = Environment.GetEnvironmentVariable("Sms__AuthToken");

        if (!string.IsNullOrEmpty(accountSid) && !string.IsNullOrEmpty(authToken))
        {
            TwilioClient.Init(accountSid, authToken);
        }
    }

    public async Task SendSmsAsync(string toPhoneNumber, string message)
    {
        var fromPhoneNumber = Environment.GetEnvironmentVariable("Sms__FromPhoneNumber") ?? "+12246165545";

        var messageResource = await MessageResource.CreateAsync(
            body: message,
            from: new Twilio.Types.PhoneNumber(fromPhoneNumber),
            to: new Twilio.Types.PhoneNumber(toPhoneNumber)
        );
    }
}