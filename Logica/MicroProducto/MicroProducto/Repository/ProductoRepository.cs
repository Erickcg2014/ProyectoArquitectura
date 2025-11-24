using System;

namespace MicroProducto.Repository;

using System.Collections.Generic;
using System.Threading.Tasks;
using MicroProducto.Model;
using MicroProducto.Model.DTO;
using MicroProducto.Persistence;
using Microsoft.EntityFrameworkCore;

public class ProductoRepository : IProductoRepository
{
    private readonly ProductoDBContext _context;


    public ProductoRepository(ProductoDBContext context)
    {
        _context = context;
    }
    public async Task CrearProducto(CreacionProducto producto, string? categoriaNombre)
{
    int? categoriaId = producto.Categoria;

    // 1. Si el ID viene en el producto, validar si existe
    if (categoriaId.HasValue)
    {
        bool categoriaExiste = await _context.Categorias
            .AnyAsync(c => c.Id == categoriaId.Value);

        if (!categoriaExiste)
            throw new ArgumentException("La categoría indicada no existe.");
    }
    else if (!string.IsNullOrWhiteSpace(categoriaNombre))
    {
        // 2. Si no vino ID, pero sí nombre → buscar categoría
        var categoria = await _context.Categorias
            .FirstOrDefaultAsync(c => c.Nombre == categoriaNombre);

        if (categoria == null)
        {
            // 3. Si no existe el nombre → crear categoría
            categoria = new Categoria { Nombre = categoriaNombre };
            await _context.Categorias.AddAsync(categoria);
            await _context.SaveChangesAsync(); // para generar ID
        }

        producto.Categoria = categoria.Id;
    }
    else
    {
        throw new ArgumentException("Debe especificar un Id de categoría o un nombre de categoría.");
    }

    var productonuevo = new Producto
    {
        Nombre = producto.Nombre,
        Descripcion = producto.Descripcion,
        CantidadDisponible = producto.CantidadDisponible,
        CantidadReservada = producto.CantidadReservada,
        Precio = producto.Precio,
        Categoria = producto.Categoria,
        ImagenUrl = producto.ImagenUrl,
        IdProveedor = producto.IdProveedor
        // No seteas el ID → lo genera PostgreSQL automáticamente
    };

    // 4. Guardar producto
    await _context.Productos.AddAsync(productonuevo);
    await _context.SaveChangesAsync();
}

    public async Task DeleteProducto(Guid id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto != null)
        {
            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Producto>> GetAllProductos()
    {
        return await _context.Productos.ToListAsync();
    }

    public async Task<double?> GetPrecioProductoById(Guid id)
    {
        var producto = await _context.Productos.FindAsync(id);

        if (producto == null)
            return null;

        return producto.Precio;
    }


    public async Task<Producto?> GetProductoById(Guid id)
    {
        return await _context.Productos.FindAsync(id);
    }

    public async Task<List<Producto>> GetProductosByIdCategoria(int categoriaId)
        {
            return await _context.Productos
                .Where(p => p.Categoria == categoriaId)
                .ToListAsync();
        }
    public async Task<List<Producto>> GetProductosByNombreCategoria(string categoriaNombre)
    {
        var categoria = await _context.Categorias
            .FirstOrDefaultAsync(c => c.Nombre == categoriaNombre);

        int idCategoria = categoria.Id;

        return await _context.Productos
            .Where(p => p.Categoria == idCategoria)
            .ToListAsync();
    }

    public async Task UpdateCantidadReservadaById(Guid id, int cantidad)
    {
        var producto = await _context.Productos.FindAsync(id);
        producto.CantidadReservada = cantidad;
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateCantidadProductoById(Guid id, int cantidad)
    {
        var producto = await _context.Productos.FindAsync(id);
        producto.CantidadDisponible = cantidad;
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProducto(Producto producto)
    {
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();   
    }

    public async Task<List<Categoria>> GetAllCategorias()
    {
        return await _context.Categorias.ToListAsync();
    }


}




