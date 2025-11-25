using MicroUsuarios.Models.DTOs;

namespace MicroUsuarios.Services;

public interface IUsuarioService
{
    // Nuevo método con datos completos del registro
    Task<UsuarioResponseDto> CreateFromKeycloakAsync(Guid keycloakId, UsuarioRegisterDto? registerDto);
    
    // Método anterior (para compatibilidad con sincronización manual)
    Task<UsuarioResponseDto> CreateFromKeycloakEventAsync(KeycloakUserEventDto eventDto);
    
    Task<UsuarioResponseDto?> GetByKeycloakIdAsync(Guid keycloakId);
    Task<UsuarioResponseDto?> GetByUsernameAsync(string username);
    Task<IEnumerable<UsuarioResponseDto>> GetAllAsync();
}