using System;
using MicroProducto.Model;
using Microsoft.EntityFrameworkCore;

namespace MicroProducto.Persistence;

public class ProductoDBContext: DbContext
{
        public ProductoDBContext(DbContextOptions<ProductoDBContext> options) : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("productos");

                entity.HasKey(e => e.Id);


                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");
                entity.Property(e => e.Cantidad).HasColumnName("cantidad");
                entity.Property(e => e.Precio).HasColumnName("precio");
                entity.Property(e => e.Categoria).HasColumnName("categoria");
                entity.Property(e => e.ImagenUrl).HasColumnName("imagenUrl");
                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");



            });
        }
    }

