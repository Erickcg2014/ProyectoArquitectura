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
                entity.ToTable("carritoitem");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IdCarrito).HasColumnName("idcarrito");
                entity.Property(e => e.IdProducto).HasColumnName("idproducto");
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
                entity.ToTable("carrito");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IdUsuario).HasColumnName("idusuario");
                entity.Property(e => e.PrecioTotal).HasColumnName("total");
                entity.Property(e => e.FechaActualizacion).HasColumnName("fecha_actualizacion");
            });
        }
    }
