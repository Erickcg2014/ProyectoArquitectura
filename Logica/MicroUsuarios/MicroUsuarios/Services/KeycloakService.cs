using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using MicroUsuarios.Models.DTOs;

namespace MicroUsuarios.Services
{
    public class KeycloakService : IKeycloakService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        private readonly string _keycloakUrl;
        private readonly string _realm;
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _adminUsername;
        private readonly string _adminPassword;

        public KeycloakService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;

            _keycloakUrl = _config["Keycloak:Url"] ?? "http://keycloak-service:8080";
            _realm = _config["Keycloak:Realm"] ?? "multichannel-realm";
            _clientId = _config["Keycloak:ClientId"] ?? "usuarios-service";
            _clientSecret = _config["Keycloak:ClientSecret"] ?? "BCgRJxIu7nqOii4AqV5GJ1FQTvZaTITf";
            _adminUsername = _config["Keycloak:AdminUsername"] ?? "admin";
            _adminPassword = _config["Keycloak:AdminPassword"] ?? "admin123";
        }

        // ================================================
        // 1. OBTENER TOKEN ADMIN
        // ================================================
        public async Task<string> GetAdminTokenAsync()
        {
            var client = _httpClientFactory.CreateClient();

            var tokenUrl = $"{_keycloakUrl}/realms/master/protocol/openid-connect/token";

            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("client_id", "admin-cli"),
                new KeyValuePair<string, string>("username", _adminUsername),
                new KeyValuePair<string, string>("password", _adminPassword)
            });

            var response = await client.PostAsync(tokenUrl, content);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var tokenData = JsonSerializer.Deserialize<JsonElement>(json);

            return tokenData.GetProperty("access_token").GetString()
                   ?? throw new Exception("No se pudo obtener el token admin de Keycloak");
        }

        // ================================================
        // 2. CREAR USUARIO
        // ================================================
        public async Task<Guid> CreateUserAsync(UsuarioRegisterDto registerDto)
        {
            var client = _httpClientFactory.CreateClient();
            var token = await GetAdminTokenAsync();

            var createUserUrl = $"{_keycloakUrl}/admin/realms/{_realm}/users";

            var keycloakUser = new
            {
                username = registerDto.Username,
                email = registerDto.Email,
                enabled = true,
                emailVerified = true,
                firstName = registerDto.Nombre.Split(" ")[0],
                lastName = registerDto.Nombre.Contains(" ")
                    ? registerDto.Nombre.Substring(registerDto.Nombre.IndexOf(" ") + 1)
                    : "",
                credentials = new[]
                {
                    new
                    {
                        type = "password",
                        value = registerDto.Password,
                        temporary = false
                    }
                }
            };

            var jsonContent = JsonSerializer.Serialize(keycloakUser);
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await client.PostAsync(createUserUrl, httpContent);

            if (response.StatusCode == System.Net.HttpStatusCode.Conflict)
                throw new InvalidOperationException("El usuario o email ya existe en Keycloak");

            if (!response.IsSuccessStatusCode)
            {
                var errorText = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error creando usuario en Keycloak: {errorText}");
            }

            var locationHeader = response.Headers.Location?.ToString()
                                 ?? throw new Exception("No se pudo obtener el ID del usuario creado");

            var userId = locationHeader.Split('/').Last();

            return Guid.Parse(userId);
        }

        public async Task<KeycloakTokenDto> LoginAsync(string username, string password)
        {
            var client = _httpClientFactory.CreateClient();

            var body = new Dictionary<string, string>
            {
                { "grant_type", "password" },
                { "client_id", _clientId },
                { "client_secret", _clientSecret },  
                { "username", username },
                { "password", password }
            };

            var content = new FormUrlEncodedContent(body);

            var response = await client.PostAsync(
                $"{_keycloakUrl}/realms/{_realm}/protocol/openid-connect/token",
                content
            );

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new UnauthorizedAccessException($"Credenciales inválidas: {errorContent}");
            }

            var json = await response.Content.ReadFromJsonAsync<KeycloakTokenDto>();

            return json ?? throw new Exception("Keycloak devolvió un token inválido");
        }

        // ================================================
        // 4. ASIGNAR ROL
        // ================================================
        public async Task AssignRoleAsync(Guid userId, string roleName)
        {
            var client = _httpClientFactory.CreateClient();
            var token = await GetAdminTokenAsync();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            // Obtener rol
            var roleUrl = $"{_keycloakUrl}/admin/realms/{_realm}/roles/{roleName}";
            var roleResponse = await client.GetAsync(roleUrl);
            roleResponse.EnsureSuccessStatusCode();

            var roleJson = await roleResponse.Content.ReadAsStringAsync();
            var roleData = JsonSerializer.Deserialize<JsonElement>(roleJson);

            // Asignar rol
            var assignUrl = $"{_keycloakUrl}/admin/realms/{_realm}/users/{userId}/role-mappings/realm";

            var roleToAssign = new[]
            {
                new
                {
                    id = roleData.GetProperty("id").GetString(),
                    name = roleData.GetProperty("name").GetString()
                }
            };

            var jsonContent = JsonSerializer.Serialize(roleToAssign);
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var assignResponse = await client.PostAsync(assignUrl, httpContent);
            assignResponse.EnsureSuccessStatusCode();
        }
    }
}
