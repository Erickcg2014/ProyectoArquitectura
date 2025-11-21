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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<CarritoItem>(entity =>
            {
                entity.ToTable("CarritoItem");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Id_producto).HasColumnName("id_producto");
                entity.Property(e => e.Cantidad).HasColumnName("cantidad");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");
                entity.Property(e => e.Id_usuario).HasColumnName("id_usuario");
                entity.Property(e => e.Precio).HasColumnName("precio");
      
            });
        }
    }
