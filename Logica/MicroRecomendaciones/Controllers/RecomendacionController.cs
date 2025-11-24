using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroRecomendaciones.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecomendacionController : ControllerBase
{
    [HttpGet("trending")]
    public ActionResult<IEnumerable<object>> GetTrendingProducts()
    {
        // Simular productos en tendencia
        var trendingProducts = new[]
        {
            new { id = 1, nombre = "Producto Tendencia 1", precio = 99.99 },
            new { id = 2, nombre = "Producto Tendencia 2", precio = 149.99 },
            new { id = 3, nombre = "Producto Tendencia 3", precio = 79.99 }
        };

        return Ok(trendingProducts);
    }

    [HttpGet("personalizadas/{userId}")]
    public ActionResult<IEnumerable<object>> GetPersonalizedRecommendations(int userId, [FromQuery] int limit = 8)
    {
        // Simular recomendaciones personalizadas
        var recommendations = new[]
        {
            new { id = 1, nombre = "Recomendación Personal 1", precio = 89.99 },
            new { id = 2, nombre = "Recomendación Personal 2", precio = 129.99 },
            new { id = 3, nombre = "Recomendación Personal 3", precio = 69.99 },
            new { id = 4, nombre = "Recomendación Personal 4", precio = 199.99 }
        };

        return Ok(recommendations.Take(limit));
    }
}