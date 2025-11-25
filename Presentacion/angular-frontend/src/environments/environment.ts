export const environment = {
  production: false,
  apiGatewayUrl: 'http://localhost:30080', // NodePort del API Gateway
  keycloakUrl: 'http://localhost:30085', // Keycloak a través del Gateway
  keycloakRealm: 'multichannel-realm',
  keycloakClientId: 'angular-frontend',
};
