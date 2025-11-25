using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroUsuarios.Models.Entities;

[Table("roles")]
public class Rol
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(20)]
    [Column("tipo")]
    public string Tipo { get; set; } = string.Empty;

    // Navigation
    public ICollection<Usuario>? Usuarios { get; set; }
}