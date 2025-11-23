using MicroProducto.Model;
using MicroProducto.Model.DTO;
using MicroProducto.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MicroProducto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _service;

        public ProductoController(ProductoService service)
        {
            _service = service;
        }

        // GET: api/producto
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productos = await _service.ObtenerTodosLosProductos();
            return Ok(productos);
        }

        // GET: api/producto/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var producto = await _service.ObtenerProductoPorId(id);
                if (producto == null)
                    return NotFound(new { mensaje = "Producto no encontrado" });

                return Ok(producto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // GET: api/producto/categoria/{categoria}
        [HttpGet("categoriaId/{id_categoria}")]
        public async Task<IActionResult> GetByCategoria(int id_categoria)
        {
            try
            {
                var productos = await _service.ObtenerProductosPorIdCategoria(id_categoria);
                return Ok(productos);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("categoriaStr/{string_categoria}")]
        public async Task<IActionResult> GetByCategoria(string string_categoria)
        {
            try
            {
                var productos = await _service.ObtenerProductosPorNombreCategoria(string_categoria);
                return Ok(productos);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // GET: api/producto/precio/5
        [HttpGet("precio/{id}")]
        public async Task<IActionResult> GetPrecio(Guid id)
        {
            try
            {
                var precio = await _service.ObtenerPrecioProductoPorId(id);
                if (precio == null)
                    return NotFound(new { mensaje = "Producto no encontrado" });

                return Ok(new { precio });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // POST: api/producto
        [HttpPost("crear")]
        public async Task<IActionResult> Crear([FromBody] CrearProductoRequest request)
        {
            try
            {
                
                var productoCreado = await _service.CrearProducto(request.Producto, request.CategoriaNombre);
                return Ok(new { mensaje = "Producto creado correctamente" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // PUT: api/producto
        [HttpPut("actualizar")]
        public async Task<IActionResult> Update([FromBody] Producto producto)
        {
            try
            {
                var actualizado = await _service.ActualizarProducto(producto);
                if (!actualizado)
                    return NotFound(new { mensaje = "Producto no encontrado" });

                return Ok(new { mensaje = "Producto actualizado correctamente" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // PATCH: api/producto/cantidad/5
        [HttpPatch("cantidad/{id}")]
        public async Task<IActionResult> UpdateCantidad(Guid id, [FromQuery] int cantidad)
        {
            try
            {
                var actualizado = await _service.ActualizarCantidadProducto(id, cantidad);
                if (!actualizado)
                    return NotFound(new { mensaje = "Producto no encontrado" });

                return Ok(new { mensaje = "Cantidad actualizada" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // DELETE: api/producto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var eliminado = await _service.EliminarProducto(id);
                if (!eliminado)
                    return NotFound(new { mensaje = "Producto no encontrado" });

                return Ok(new { mensaje = "Producto eliminado" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // POST: api/producto/verificar-disponibilidad/5
        [HttpPost("verificar-disponibilidad/{id}")]
        public async Task<IActionResult> VerificarDisponibilidad(Guid id, [FromQuery] int cantidad)
        {
            var disponible = await _service.VerificarDisponibilidad(id, cantidad);
            return Ok(new { disponible });
        }

        // POST: api/producto/reducir-inventario/5
        [HttpPost("reducir-inventario/{id}")]
        public async Task<IActionResult> ReducirInventario(Guid id, [FromQuery] int cantidad)
        {
            try
            {
                var reducido = await _service.ReducirInventario(id, cantidad);
                if (!reducido)
                    return BadRequest(new { mensaje = "No hay stock suficiente o producto no encontrado" });

                return Ok(new { mensaje = "Inventario reducido correctamente" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }


        [HttpPost("descontarCantidadReservada/{id}")]
        public async Task<IActionResult> ReducirCantidadReservada(Guid id, [FromQuery] int cantidadReservadaEliminar)
        {
            try
            {
                var reducido = await _service.ActualizarCantidadDisponible6HorasCumplidas(id, cantidadReservadaEliminar);
                if (!reducido)
                    return BadRequest(new { mensaje = "Error" });

                return Ok(new { mensaje = "Cantidad Reservada reducida correctamente" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("categorias")]
        public async Task<List<Categoria>> ObtenerCategorias()
        {
            return await _service.GetAllCategorias();
        }
    }
}