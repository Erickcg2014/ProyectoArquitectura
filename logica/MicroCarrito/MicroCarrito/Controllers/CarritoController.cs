using MicroCarrito.Model;
using MicroCarrito.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MicroCarrito.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarritoController : ControllerBase
    {
        private readonly CarritoService _service;
        private readonly ILogger<CarritoController> _logger;

        public CarritoController(CarritoService service)
        {
            _service = service;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearCarritoItem([FromBody] CarritoItem item)
        {
            try
            {
                await _service.CrearCarritoItem(item);
                return CreatedAtAction(nameof(GetCarritoItemById), new { id = item.Id }, item);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarritoItemById(int id)
        {
            try
            {
                var item = await _service.GetCarritoItemById(id);

                if (item == null)
                    return NotFound("El item no existe");

                return Ok(item);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("cliente/{idCliente}")]
        public async Task<IActionResult> GetAllCarritoItemByIdCliente(int idCliente)
        {
            try
            {
                var items = await _service.GetAllCarritoItemByIdCliente(idCliente);
                return Ok(items);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarritoItem(int id)
        {
            try
            {
                await _service.DeleteCarritoItem(id);
                return Ok($"Item {id} eliminado correctamente");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPut("cantidad/{id}")]
        public async Task<IActionResult> UpdateCantidadCarritoItem(int id, [FromBody] int cantidad)
        {
            try
            {
                await _service.UpdateCantidadCarritoItem(id, cantidad);
                return Ok("Cantidad actualizada");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPut("descripcion/{id}")]
        public async Task<IActionResult> UpdateDescripcionCarritoItem(int id, [FromBody] string descripcion)
        {
            try
            {
                await _service.UpdateDescripcionCarritoItem(id, descripcion);
                return Ok("Descripción actualizada");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPut("precio/{id}")]
        public async Task<IActionResult> UpdatePrecioCarritoItem(int id, [FromBody] double precio)
        {
            try
            {
                await _service.UpdatePrecioCarritoItem(id, precio);
                return Ok("Precio actualizado");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
        [HttpDelete("cliente/{id_cliente}")]
        public async Task<IActionResult> DeleteByCliente(int id_cliente)
        {
            try
            {
                await _service.DeleteCarritoItemsByIdCliente(id_cliente);
                return Ok(new { message = "Items eliminados correctamente" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

    }
}