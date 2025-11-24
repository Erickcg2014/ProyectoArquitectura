using Microsoft.AspNetCore.Mvc;
using MicroProducto.Model;
using MicroProducto.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroProducto.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoController : ControllerBase
{
    private readonly IProductoRepository _productoRepository;

    public ProductoController(IProductoRepository productoRepository)
    {
        _productoRepository = productoRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
    {
        var productos = await _productoRepository.GetAllProductos();
        return Ok(productos);
    }

    [HttpGet("categoriaStr/{categoria}")]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductosByCategoria(string categoria)
    {
        // Decodificar la categoría si viene URL-encoded
        categoria = Uri.UnescapeDataString(categoria);

        var productos = await _productoRepository.GetProductosByNombreCategoria(categoria);
        return Ok(productos ?? new List<Producto>());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Producto>> GetProducto(Guid id)
    {
        var producto = await _productoRepository.GetProductoById(id);
        if (producto == null)
        {
            return NotFound();
        }
        return Ok(producto);
    }

    [HttpPost]
    public async Task<ActionResult<Producto>> CreateProducto(CreacionProducto producto)
    {
        var nuevoProducto = new Producto
        {
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Stock = producto.Stock,
            CategoriaId = producto.CategoriaId,
            ImagenUrl = producto.ImagenUrl
        };

        var created = await _productoRepository.CreateAsync(nuevoProducto);
        return CreatedAtAction(nameof(GetProducto), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProducto(int id, Producto producto)
    {
        if (id != producto.Id)
        {
            return BadRequest();
        }

        var result = await _productoRepository.UpdateAsync(producto);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var result = await _productoRepository.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}