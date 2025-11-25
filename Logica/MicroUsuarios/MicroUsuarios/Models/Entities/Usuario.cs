using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroUsuarios.Models.Entities;

[Table("usuarios")]
public class Usuario
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Column("keycloak_id")]
    public Guid KeycloakId { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("username")]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [MaxLength(30)]
    [Column("telefono")]
    public string? Telefono { get; set; }

    [MaxLength(150)]
    [Column("direccion")]
    public string? Direccion { get; set; }

    [MaxLength(100)]
    [Column("barrio")]
    public string? Barrio { get; set; }

    [MaxLength(100)]
    [Column("ciudad")]
    public string? Ciudad { get; set; }

    [MaxLength(100)]
    [Column("departamento")]
    public string? Departamento { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("pais")]
    public string Pais { get; set; } = string.Empty;

    [MaxLength(20)]
    [Column("genero")]
    public string? Genero { get; set; }

    [Column("fecha_nacimiento")]
    public DateTime? FechaNacimiento { get; set; }

    [Required]
    [Column("idrol")]
    public int IdRol { get; set; }

    [Column("fecha_creacion")]
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

    [Column("fecha_actualizacion")]
    public DateTime FechaActualizacion { get; set; } = DateTime.UtcNow;

    [Column("activo")]
    public bool Activo { get; set; } = true;

    // Navigation
    [ForeignKey("IdRol")]
    public Rol? Rol { get; set; }
}