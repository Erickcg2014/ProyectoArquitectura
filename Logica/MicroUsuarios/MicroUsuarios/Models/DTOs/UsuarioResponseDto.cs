namespace MicroUsuarios.Models.DTOs;

public class UsuarioResponseDto
{
    public Guid Id { get; set; }
    public Guid KeycloakId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefono { get; set; }
    public string? Direccion { get; set; }
    public string? Ciudad { get; set; }
    public string Pais { get; set; } = string.Empty;
    public string? RolTipo { get; set; }
    public bool Activo { get; set; }
    public DateTime FechaCreacion { get; set; }
}