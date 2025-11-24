using System;
using MicroProducto.Model;
using MicroProducto.Model.DTO;

namespace MicroProducto.Repository;

public interface IProductoRepository
{
    Task CrearProducto (CreacionProducto producto, string? nombre);
    Task<List<Producto>> GetAllProductos();
    Task<Producto?> GetProductoById(Guid id);
    Task UpdateProducto(Producto producto);
    Task DeleteProducto(Guid id);
    Task UpdateCantidadProductoById(Guid id, int cantidad);
    Task UpdateCantidadReservadaById(Guid id, int cantidad);
    Task<double?> GetPrecioProductoById(Guid id);
    Task<List<Producto>> GetProductosByIdCategoria(int categoria);
    Task<List<Producto>> GetProductosByNombreCategoria(string categoria);
    Task<List<Categoria>> GetAllCategorias();

}
