namespace MicroUsuarios.Models.DTOs;

public class UsuarioCreateDto
{
    public Guid KeycloakId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefono { get; set; }
    public string? Direccion { get; set; }
    public string? Barrio { get; set; }
    public string? Ciudad { get; set; }
    public string? Departamento { get; set; }
    public string Pais { get; set; } = "Colombia";
    public string? Genero { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public int IdRol { get; set; } = 1; // Por defecto: cliente
}