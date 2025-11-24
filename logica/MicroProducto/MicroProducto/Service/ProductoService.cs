using System;
using MicroProducto.Model;
using MicroProducto.Model.DTO;
using MicroProducto.Repository;

namespace MicroProducto.Service;

public class ProductoService
    {
        private readonly IProductoRepository _productoRepository;

        public ProductoService(IProductoRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        public async Task<CreacionProducto> CrearProducto(CreacionProducto producto, string? categoriaNombre)
        {

            if (producto.Precio <= 0)
                throw new ArgumentException("El precio debe ser mayor a cero");

            await _productoRepository.CrearProducto(producto, categoriaNombre);
            return producto;
        }

        public async Task<bool> EliminarProducto(Guid id)
        {

            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null)
                return false;

            await _productoRepository.DeleteProducto(id);
            return true;
        }

        public async Task<List<Producto>> ObtenerTodosLosProductos()
        {
            return await _productoRepository.GetAllProductos();
        }

        public async Task<Producto?> ObtenerProductoPorId(Guid id)
        {

            return await _productoRepository.GetProductoById(id);
        }

        public async Task<double?> ObtenerPrecioProductoPorId(Guid id)
        {
            if (id == null)
                throw new ArgumentException("ID inválido");

            return await _productoRepository.GetPrecioProductoById(id);
        }

        public async Task<List<Producto>> ObtenerProductosPorIdCategoria(int categoria)
        {
            if (categoria <= 0)
                throw new ArgumentException("La categoría es requerida");

            return await _productoRepository.GetProductosByIdCategoria(categoria);
        }

        public async Task<List<Producto>> ObtenerProductosPorNombreCategoria(string categoria)
        {

            return await _productoRepository.GetProductosByNombreCategoria(categoria);
        }

        public async Task<bool> ActualizarProducto(Producto producto)
        {
            if (producto == null)
                throw new ArgumentNullException(nameof(producto));

            if (producto.Id == null)
                throw new ArgumentException("ID inválido");

            var productoExistente = await _productoRepository.GetProductoById(producto.Id);
            if (productoExistente == null)
                return false;

            if (string.IsNullOrWhiteSpace(producto.Nombre))
                throw new ArgumentException("El nombre del producto es requerido");

            if (producto.Precio <= 0)
                throw new ArgumentException("El precio debe ser mayor a cero");

            await _productoRepository.UpdateProducto(producto);
            return true;
        }

        public async Task<bool> ActualizarCantidadProducto(Guid id, int cantidad)
        {
            if (id == null)
                throw new ArgumentException("ID inválido");

            if (cantidad < 0)
                throw new ArgumentException("La cantidad no puede ser negativa");

            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null)
                return false;

            await _productoRepository.UpdateCantidadProductoById(id, cantidad);
            return true;
        }

        public async Task<bool> VerificarDisponibilidad(Guid id, int cantidadRequerida)
        {
            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null)
                return false;

            return (producto.CantidadDisponible - producto.CantidadReservada) >= cantidadRequerida;
        }

        public async Task<bool> ActualizarCantidadDisponible6HorasCumplidas(Guid id, int cantidadReservadaEliminar)
        {
            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null)
                return false;
            await _productoRepository.UpdateCantidadReservadaById(id, producto.CantidadReservada - cantidadReservadaEliminar);
            return true;
        }

        public async Task<bool> ReducirInventario(Guid id, int cantidad)
        {
            if (id == null || cantidad <= 0)
                throw new ArgumentException("ID y cantidad deben ser mayores a cero");

            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null || producto.CantidadDisponible < cantidad)
                return false;

            await _productoRepository.UpdateCantidadProductoById(id, producto.CantidadDisponible - cantidad);
            return true;
        }

        public async Task<List<Categoria>> GetAllCategorias()
    {
        return await _productoRepository.GetAllCategorias();
    }


}
