namespace MicroUsuarios.Models.DTOs;

public class KeycloakUserEventDto
{
    public Guid KeycloakId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
}