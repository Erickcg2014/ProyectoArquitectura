using System;
using MicroCarrito.Model;

namespace MicroCarrito.Repository;

public interface ICarritoRepository
{
    Task CrearCarrito(Carrito carrito);
    Task CrearCarritoItem (CarritoItem carritoItem);
    Task<List<CarritoItem>> GetAllCarritoItemByIdCliente(int id_cliente);
    Task UpdateCantidadCarritoItem (int idCarritoItem, int cantidad);
    Task DeleteCarritoItem (int idCarritoItem);
    Task UpdateDescripcionCarritoItem (int idCarritoItem, string descripcion);
    Task<CarritoItem> GetCarritoItemById (int idCarritoItem);
    Task UpdatePrecioCarrito (int idCarrito, double precio);
    Task DeleteCarritoItemsByIdCliente(int id_cliente);
    Task UpdateFechaActualizacionCarrito (int idCarrito, DateTime dateTime);

}
