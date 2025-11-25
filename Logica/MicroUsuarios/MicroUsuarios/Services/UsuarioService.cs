using MicroUsuarios.Data.Repositories;
using MicroUsuarios.Models.DTOs;
using MicroUsuarios.Models.Entities;

namespace MicroUsuarios.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repository;

    public UsuarioService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    // ========================================
    // NUEVO: Método con datos completos del registro
    // ========================================
    public async Task<UsuarioResponseDto> CreateFromKeycloakAsync(Guid keycloakId, UsuarioRegisterDto? registerDto)
    {
        var existingUser = await _repository.GetByKeycloakIdAsync(keycloakId);
        if (existingUser != null)
            throw new InvalidOperationException("El usuario ya está registrado en la base de datos");

        if (registerDto != null)
        {
            if (await _repository.ExistsByUsernameAsync(registerDto.Username))
                throw new InvalidOperationException("El username ya existe");

            if (await _repository.ExistsByEmailAsync(registerDto.Email))
                throw new InvalidOperationException("El email ya existe");
        }

        var usuario = new Usuario
        {
            KeycloakId = keycloakId,
            Username = registerDto?.Username ?? "user_" + keycloakId.ToString().Substring(0, 8),
            Email = registerDto?.Email ?? $"user_{keycloakId}@temp.com",
            Nombre = registerDto?.Nombre ?? "Usuario",
            Telefono = registerDto?.Telefono,
            Direccion = registerDto?.Direccion,
            Barrio = registerDto?.Barrio,
            Ciudad = registerDto?.Ciudad,
            Departamento = registerDto?.Departamento,
            Pais = registerDto?.Pais ?? "Colombia",
            Genero = registerDto?.Genero,
            FechaNacimiento = registerDto?.FechaNacimiento,
            IdRol = registerDto?.IdRol ?? 1 
        };

        var created = await _repository.CreateAsync(usuario);
        return MapToDto(created);
    }


    public async Task<UsuarioResponseDto> CreateFromKeycloakEventAsync(KeycloakUserEventDto eventDto)
    {
        if (await _repository.ExistsByUsernameAsync(eventDto.Username))
            throw new InvalidOperationException("El username ya existe");

        if (await _repository.ExistsByEmailAsync(eventDto.Email))
            throw new InvalidOperationException("El email ya existe");

        var usuario = new Usuario
        {
            KeycloakId = eventDto.KeycloakId,
            Username = eventDto.Username,
            Email = eventDto.Email,
            Nombre = eventDto.Nombre,
            Pais = "Colombia",
            IdRol = 1 // Por defecto: cliente
        };

        var created = await _repository.CreateAsync(usuario);
        return MapToDto(created);
    }

    public async Task<UsuarioResponseDto?> GetByKeycloakIdAsync(Guid keycloakId)
    {
        var usuario = await _repository.GetByKeycloakIdAsync(keycloakId);
        return usuario != null ? MapToDto(usuario) : null;
    }

    public async Task<UsuarioResponseDto?> GetByUsernameAsync(string username)
    {
        var usuario = await _repository.GetByUsernameAsync(username);
        return usuario != null ? MapToDto(usuario) : null;
    }

    public async Task<IEnumerable<UsuarioResponseDto>> GetAllAsync()
    {
        var usuarios = await _repository.GetAllAsync();
        return usuarios.Select(MapToDto);
    }

    private UsuarioResponseDto MapToDto(Usuario usuario)
    {
        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            KeycloakId = usuario.KeycloakId,
            Username = usuario.Username,
            Nombre = usuario.Nombre,
            Email = usuario.Email,
            Telefono = usuario.Telefono,
            Direccion = usuario.Direccion,
            Ciudad = usuario.Ciudad,
            Pais = usuario.Pais,
            RolTipo = usuario.Rol?.Tipo,
            Activo = usuario.Activo,
            FechaCreacion = usuario.FechaCreacion
        };
    }
}