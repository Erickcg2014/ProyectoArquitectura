using System;

namespace MicroProducto.Repository;

using System.Collections.Generic;
using System.Threading.Tasks;
using MicroProducto.Model;
using MicroProducto.Persistence;
using Microsoft.EntityFrameworkCore;

public class ProductoRepository : IProductoRepository
{
    private readonly ProductoDBContext _context;

    public ProductoRepository(ProductoDBContext context)
    {
        _context = context;
    }
    public async Task CrearProducto(Producto producto)
    {
        await _context.Productos.AddAsync(producto);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProducto(int id)
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

    public async Task<double?> GetPrecioProductoById(int id)
    {
        var producto = await _context.Productos.FindAsync(id);

        if (producto == null)
            return null;

        return producto.Precio;
    }


    public async Task<Producto?> GetProductoById(int id)
    {
        return await _context.Productos.FindAsync(id);
    }

    public async Task<List<Producto>> GetProductosByCategoria(string categoria)
    {
        return await _context.Productos
            .Where(p => p.Categoria == categoria)
            .ToListAsync();
    }


    public async Task UpdateCantidadProductoById(int id, int cantidad)
    {
        var producto = await _context.Productos.FindAsync(id);
        producto.Cantidad = cantidad;
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProducto(Producto producto)
    {
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();   
    }

}




