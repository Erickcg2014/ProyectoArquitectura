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

    public async Task CrearCarrito(Carrito carrito)
    {
        await _context.Carritos.AddAsync(carrito);
        await _context.SaveChangesAsync();
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

    public async Task DeleteCarritoItemsByIdCliente(Guid id_cliente)
    {
       var carrito =  await _context.Carritos
        .Where(c => c.IdUsuario == id_cliente).FirstAsync();

        _context.Carritos.Remove(carrito);
        await _context.SaveChangesAsync();
    }


    public async Task<List<CarritoItem>> GetAllCarritoItemByIdCliente(Guid id_cliente)
    {
        var carrito = await _context.Carritos.Where(c => c.IdUsuario == id_cliente).FirstAsync();
        return await _context.CarritoItems
            .Where(x => x.IdCarrito == carrito.Id)
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

    public Task UpdateFechaActualizacionCarrito(int idCarrito, DateTime dateTime)
    {
        throw new NotImplementedException();
    }

    public async Task UpdatePrecioCarrito(int idCarrito, double precio)
    {
        var item = await _context.Carritos.FindAsync(idCarrito);

        if (item == null)
            return;

        item.PrecioTotal = precio;

        await _context.SaveChangesAsync();
    }
}
