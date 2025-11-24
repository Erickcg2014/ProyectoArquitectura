import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from './core/keycloak.service';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init();
}

export const keycloakInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  deps: [KeycloakService],
  multi: true
};