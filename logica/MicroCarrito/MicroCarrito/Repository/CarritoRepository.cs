using System;
using MicroCarrito.Model;
using MicroCarrito.Persistence;
using Microsoft.EntityFrameworkCore;

namespace MicroCarrito.Repository;

public class CarritoRepository : ICarritoRepository
{
    private readonly CarritoDBContext _context;

    public CarritoRepository(CarritoDBContext context)
    {
        _context = context;
    }


    public async Task CrearCarritoItem(CarritoItem carritoItem)
    {
        await _context.CarritoItems.AddAsync(carritoItem);
        await _context.SaveChangesAsync();
    }

 
    public async Task DeleteCarritoItem(int idCarritoItem)
    {
        var item = await _context.CarritoItems.FindAsync(idCarritoItem);

        if (item == null)
            return;

        _context.CarritoItems.Remove(item);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCarritoItemsByIdCliente(int id_cliente)
    {
        var items = await _context.CarritoItems
            .Where(x => x.Id_usuario == id_cliente)
            .ToListAsync();

        if (items == null || !items.Any())
            return;

        _context.CarritoItems.RemoveRange(items);
        await _context.SaveChangesAsync();
    }


    public async Task<List<CarritoItem>> GetAllCarritoItemByIdCliente(int id_cliente)
    {
        return await _context.CarritoItems
            .Where(x => x.Id_usuario == id_cliente)
            .ToListAsync();
    }

    
    public async Task<CarritoItem> GetCarritoItemById(int idCarritoItem)
    {
        return await _context.CarritoItems.FindAsync(idCarritoItem);
    }

        public async Task UpdateCantidadCarritoItem(int idCarritoItem, int cantidad)
    {
        var item = await _context.CarritoItems.FindAsync(idCarritoItem);

        if (item == null)
            return;

        item.Cantidad = cantidad;

        await _context.SaveChangesAsync();
    }

       public async Task UpdateDescripcionCarritoItem(int idCarritoItem, string descripcion)
    {
        var item = await _context.CarritoItems.FindAsync(idCarritoItem);

        if (item == null)
            return;

        item.Descripcion = descripcion;

        await _context.SaveChangesAsync();
    }


    public async Task UpdatePrecioCarritoItem(int idCarritoItem, double precio)
    {
        var item = await _context.CarritoItems.FindAsync(idCarritoItem);

        if (item == null)
            return;

        item.Precio = precio;

        await _context.SaveChangesAsync();
    }
}
