using System;
using MicroCarrito.Model;
using MicroCarrito.Repository;

namespace MicroCarrito.Service;

public class CarritoService
{
    private readonly ICarritoRepository _repo;
    public CarritoService(ICarritoRepository repo)
    {
        _repo = repo;
    }


    public async Task CrearCarritoItem(CarritoItem carritoItem)
    {

            await _repo.CrearCarritoItem(carritoItem);

    }


    public async Task<List<CarritoItem>> GetAllCarritoItemByIdCliente(int idCliente)
    {

            return await _repo.GetAllCarritoItemByIdCliente(idCliente);

    }


    public async Task<CarritoItem> GetCarritoItemById(int id)
    {

            var item = await _repo.GetCarritoItemById(id);

            if (item == null)
                throw new KeyNotFoundException("El item del carrito no existe");

            return item;

    }


    public async Task DeleteCarritoItem(int id)
    {

            await _repo.DeleteCarritoItem(id);

    }


    public async Task UpdateCantidadCarritoItem(int id, int cantidad)
    {

            await _repo.UpdateCantidadCarritoItem(id, cantidad);

    }


    public async Task UpdateDescripcionCarritoItem(int id, string descripcion)
    {

            await _repo.UpdateDescripcionCarritoItem(id, descripcion);

    }

    public async Task UpdatePrecioCarritoItem(int id, double precio)
    {

            await _repo.UpdatePrecioCarritoItem(id, precio);

    }
    public async Task DeleteCarritoItemsByIdCliente(int id_cliente)
    {

            await _repo.DeleteCarritoItemsByIdCliente(id_cliente);

    }
}
