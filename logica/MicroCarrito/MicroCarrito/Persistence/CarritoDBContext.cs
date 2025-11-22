using System;
using Microsoft.EntityFrameworkCore;
using MicroCarrito.Model;

namespace MicroCarrito.Persistence;

public class CarritoDBContext : DbContext
{
        public CarritoDBContext(DbContextOptions<CarritoDBContext> options) : base(options)
        {
        }

        public DbSet<CarritoItem> CarritoItems { get; set; }
        public DbSet<Carrito> Carritos { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<CarritoItem>(entity =>
            {
                entity.ToTable("CarritoItem");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IdCarrito).HasColumnName("id_carrito");
                entity.Property(e => e.IdProducto).HasColumnName("id_producto");
                entity.Property(e => e.Cantidad).HasColumnName("cantidad");
                entity.Property(e => e.PrecioUnitario).HasColumnName("precio_unitario");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.HasOne<Carrito>()
                      .WithMany()
                      .HasForeignKey(e => e.IdCarrito)
                      .OnDelete(DeleteBehavior.Restrict);

      
            });
            modelBuilder.Entity<Carrito>(entity =>
            {
                entity.ToTable("Carrito");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
                entity.Property(e => e.PrecioTotal).HasColumnName("precio");
                entity.Property(e => e.FechaActualizacion).HasColumnName("fechaactualizacion");
            });
        }
    }
