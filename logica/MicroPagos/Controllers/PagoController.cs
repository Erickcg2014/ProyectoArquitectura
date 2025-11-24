using Microsoft.AspNetCore.Mvc;
using MicroPagos.Service;
using MicroPagos.Model;

namespace MicroPagos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagoController : ControllerBase
{
    private readonly PagoService _service;

    public PagoController(PagoService service)
    {
        _service = service;
    }

    [HttpPost("iniciar")]
    public async Task<IActionResult> IniciarPago([FromBody] IniciarPagoRequest request)
    {
        var pago = await _service.IniciarPago(request.IdOrden, request.Monto, request.Metodo);
        return Ok(new { pago.Id, UrlPago = "https://gateway.com/pay/" + pago.Id }); // Simulado
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> Webhook([FromBody] WebhookRequest request)
    {
        await _service.ProcesarWebhook(request.GatewayId, request.Estado, request.Monto);
        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerPago(Guid id)
    {
        var pago = await _service.ObtenerPagoPorId(id);
        if (pago == null) return NotFound();
        return Ok(pago);
    }
}

public class IniciarPagoRequest
{
    public Guid IdOrden { get; set; }
    public decimal Monto { get; set; }
    public string Metodo { get; set; }
}

public class WebhookRequest
{
    public string GatewayId { get; set; }
    public string Estado { get; set; }
    public decimal Monto { get; set; }
}