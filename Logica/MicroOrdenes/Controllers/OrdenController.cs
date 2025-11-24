using Microsoft.AspNetCore.Mvc;

namespace MicroOrdenes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdenController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Microservicio de Órdenes funcionando");
    }

    [HttpPost]
    public IActionResult Post([FromBody] object orden)
    {
        return Created("", new { message = "Orden creada", data = orden });
    }
}