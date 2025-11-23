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
        public DbSet<Categoria> Categorias {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("productos");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");
                entity.Property(e => e.CantidadDisponible).HasColumnName("cantidadDisponible");
                entity.Property(e => e.Precio).HasColumnName("precio");
                entity.Property(e => e.Categoria).HasColumnName("idCategoria");
                entity.Property(e => e.ImagenUrl).HasColumnName("imagenUrl");
                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");
                entity.Property(e => e.CantidadReservada).HasColumnName("cantidadReservada");
                             
                // Relación opcional: Producto → Categoria
                entity.HasOne<Categoria>()
                      .WithMany()
                      .HasForeignKey(e => e.Categoria)
                      .OnDelete(DeleteBehavior.Restrict);

            });
            
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("categoria");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
            });
        }
    }

