export const environment = {
  production: true,
  keycloak: {
    url: 'http://keycloak:8080', // Usar nombre del servicio en Docker
    realm: 'multichannel-realm',
    clientId: 'angular-frontend'
  },
  apiUrl: 'http://api-gateway:8080' // API Gateway en Docker
};