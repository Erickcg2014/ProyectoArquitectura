import { KeycloakService } from './core/keycloak.service';

export function initializeKeycloak(keycloakService: KeycloakService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return keycloakService.init();
  };
}