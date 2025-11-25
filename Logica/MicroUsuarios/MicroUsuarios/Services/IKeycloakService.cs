using MicroUsuarios.Models.DTOs;

namespace MicroUsuarios.Services;

public interface IKeycloakService
{
    Task<Guid> CreateUserAsync(UsuarioRegisterDto registerDto);
    Task AssignRoleAsync(Guid userId, string roleName);
    Task<string> GetAdminTokenAsync();
    Task<KeycloakTokenDto> LoginAsync(string username, string password);
}