using System;
using MicroProducto.Model;
using MicroProducto.Repository;

namespace MicroProducto.Service;

public class ProductoService
    {
        private readonly IProductoRepository _productoRepository;

        public ProductoService(IProductoRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        public async Task<Producto> CrearProducto(Producto producto)
        {
            if (producto == null)
                throw new ArgumentNullException(nameof(producto));

            if (string.IsNullOrWhiteSpace(producto.Nombre))
                throw new ArgumentException("El nombre del producto es requerido");

            if (producto.Precio <= 0)
                throw new ArgumentException("El precio debe ser mayor a cero");

            await _productoRepository.CrearProducto(producto);
            return producto;
        }

        public async Task<bool> EliminarProducto(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

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

        public async Task<Producto?> ObtenerProductoPorId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

            return await _productoRepository.GetProductoById(id);
        }

        public async Task<double?> ObtenerPrecioProductoPorId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

            return await _productoRepository.GetPrecioProductoById(id);
        }

        public async Task<List<Producto>> ObtenerProductosPorCategoria(string categoria)
        {
            if (string.IsNullOrWhiteSpace(categoria))
                throw new ArgumentException("La categoría es requerida");

            return await _productoRepository.GetProductosByCategoria(categoria);
        }

        public async Task<bool> ActualizarProducto(Producto producto)
        {
            if (producto == null)
                throw new ArgumentNullException(nameof(producto));

            if (producto.Id <= 0)
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

        public async Task<bool> ActualizarCantidadProducto(int id, int cantidad)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

            if (cantidad < 0)
                throw new ArgumentException("La cantidad no puede ser negativa");

            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null)
                return false;

            await _productoRepository.UpdateCantidadProductoById(id, cantidad);
            return true;
        }

        public async Task<bool> VerificarDisponibilidad(int id, int cantidadRequerida)
        {
            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null)
                return false;

            return producto.Cantidad >= cantidadRequerida;
        }

        public async Task<bool> ReducirInventario(int id, int cantidad)
        {
            if (id <= 0 || cantidad <= 0)
                throw new ArgumentException("ID y cantidad deben ser mayores a cero");

            var producto = await _productoRepository.GetProductoById(id);
            if (producto == null || producto.Cantidad < cantidad)
                return false;

            await _productoRepository.UpdateCantidadProductoById(id, producto.Cantidad - cantidad);
            return true;
        }
    }
