using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MicroUsuarios.Models.DTOs;
using MicroUsuarios.Services;

namespace MicroUsuarios.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioService _service;
    private readonly IKeycloakService _keycloakService;

    public UsuariosController(IUsuarioService service, IKeycloakService keycloakService)
    {
        _service = service;
        _keycloakService = keycloakService;
    }

    // ========================================
    // REGISTRO COMPLETO (Keycloak + BD)
    // ========================================
    [HttpPost("register")]
    public async Task<ActionResult<UsuarioResponseDto>> Register([FromBody] UsuarioRegisterDto registerDto)
    {
        try
        {
            // 1. Crear usuario en Keycloak
            var keycloakId = await _keycloakService.CreateUserAsync(registerDto);

            // 2. Asignar rol en Keycloak según IdRol
            string roleName = registerDto.IdRol switch
            {
                2 => "provider",
                3 => "admin",
                _ => "user"
            };
            await _keycloakService.AssignRoleAsync(keycloakId, roleName);

            // 3. Guardar en la BD
            var usuario = await _service.CreateFromKeycloakAsync(keycloakId, registerDto);

            return CreatedAtAction(nameof(GetByKeycloakId), new { keycloakId = usuario.KeycloakId }, usuario);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, new { message = "Error al comunicarse con Keycloak", details = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error en el registro", details = ex.Message });
        }
    }

    // ========================================
    // LOGIN (Desde API Gateway)
    // ========================================
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginRequestDto loginDto)
    {
        try
        {
            // 1. Autenticar contra Keycloak
            var token = await _keycloakService.LoginAsync(loginDto.Username, loginDto.Password);

            // 2. Obtener al usuario desde la BD usando username
            var usuario = await _service.GetByUsernameAsync(loginDto.Username);

            if (usuario == null)
                return Unauthorized(new { message = "Usuario no encontrado en la base de datos" });

            // 3. Retornar tokens + usuario
            return Ok(new
            {
                access_token = token.access_token,
                refresh_token = token.refresh_token,
                user = usuario
            });
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized(new { message = "Credenciales inválidas" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error en login", details = ex.Message });
        }
    }

    // ========================================
    // SINCRONIZACIÓN OPCIONAL DESDE KEYCLOAK
    // ========================================
    [HttpPost("sync-from-keycloak")]
    public async Task<ActionResult<UsuarioResponseDto>> SyncFromKeycloak([FromBody] KeycloakUserEventDto eventDto)
    {
        try
        {
            var usuario = await _service.CreateFromKeycloakAsync(eventDto.KeycloakId, null);
            return CreatedAtAction(nameof(GetByKeycloakId), new { keycloakId = usuario.KeycloakId }, usuario);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // ========================================
    // PERFIL DEL USUARIO AUTENTICADO
    // ========================================
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UsuarioResponseDto>> GetCurrentUser()
    {
        var keycloakIdClaim = User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(keycloakIdClaim) || !Guid.TryParse(keycloakIdClaim, out var keycloakId))
            return Unauthorized();

        var usuario = await _service.GetByKeycloakIdAsync(keycloakId);

        if (usuario == null)
            return NotFound();

        return Ok(usuario);
    }

    // ========================================
    // OBTENER USUARIO POR KEYCLOAK ID
    // ========================================
    [HttpGet("keycloak/{keycloakId:guid}")]
    public async Task<ActionResult<UsuarioResponseDto>> GetByKeycloakId(Guid keycloakId)
    {
        var usuario = await _service.GetByKeycloakIdAsync(keycloakId);

        if (usuario == null)
            return NotFound();

        return Ok(usuario);
    }

    // ========================================
    // OBTENER TODOS (Solo Admin)
    // ========================================
    [Authorize(Roles = "administrador")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UsuarioResponseDto>>> GetAll()
    {
        var usuarios = await _service.GetAllAsync();
        return Ok(usuarios);
    }
}
