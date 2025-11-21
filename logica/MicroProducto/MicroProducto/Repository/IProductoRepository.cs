using System;
using MicroProducto.Model;

namespace MicroProducto.Repository;

public interface IProductoRepository
{
    Task CrearProducto (Producto producto, string? nombre);
    Task<List<Producto>> GetAllProductos();
    Task<Producto?> GetProductoById(int id);
    Task UpdateProducto(Producto producto);
    Task DeleteProducto(int id);
    Task UpdateCantidadProductoById(int id, int cantidad);
    Task UpdateCantidadReservadaById(int id, int cantidad);
    Task<double?> GetPrecioProductoById(int id);
    Task<List<Producto>> GetProductosByIdCategoria(int categoria);
    Task<List<Producto>> GetProductosByNombreCategoria(string categoria);

}
