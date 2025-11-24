using System.Net.Http.Json;
using System.Text.Json;

namespace MicroPagos.Integration;

public class PaymentGatewayClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public PaymentGatewayClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;

        var baseUrl = _config["PaymentGateway:BaseUrl"];
        var apiKey = _config["PaymentGateway:ApiKey"];

        _httpClient.BaseAddress = new Uri(baseUrl);
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
        _httpClient.Timeout = TimeSpan.FromSeconds(30); // Timeout
    }

    public async Task<GatewayResponse> CrearPago(decimal monto, string metodo, Guid idPago)
    {
        var request = new
        {
            amount = (long)(monto * 100), // Centavos
            currency = "usd",
            payment_method_types = new[] { metodo },
            metadata = new { order_id = idPago.ToString() }
        };

        try
        {
            var response = await _httpClient.PostAsJsonAsync("/payment_intents", request);

            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<GatewayResponse>();
                return result;
            }
            else
            {
                throw new Exception($"Gateway error: {response.StatusCode}");
            }
        }
        catch (HttpRequestException ex)
        {
            throw new Exception("Timeout or network error", ex);
        }
    }

    public async Task<bool> ConfirmarPago(string paymentIntentId)
    {
        try
        {
            var response = await _httpClient.PostAsync($"/payment_intents/{paymentIntentId}/confirm", null);
            return response.IsSuccessStatusCode;
        }
        catch (HttpRequestException ex)
        {
            throw new Exception("Confirmation failed", ex);
        }
    }
}

public class GatewayResponse
{
    public string Id { get; set; }
    public string ClientSecret { get; set; }
    public string Status { get; set; }
}