# Microservicio de Notificaciones - Kubernetes Deployment

## Archivos
- `deployment.yaml` - Deployment del microservicio
- `service.yaml` - Servicio ClusterIP
- `hpa.yaml` - Auto-scaling horizontal
- `secret.yaml` - Template para secrets (NO INCLUIR CREDENCIALES REALES)

## Configuración de Secrets

### 1. Crear el Secret con credenciales Twilio

```bash
# Codificar credenciales en base64
echo -n "YOUR_TWILIO_ACCOUNT_SID" | base64
echo -n "YOUR_TWILIO_AUTH_TOKEN" | base64
echo -n "YOUR_TWILIO_PHONE_NUMBER" | base64
```

### 2. Actualizar secret.yaml con los valores codificados

```yaml
data:
  twilio-account-sid: <BASE64_ENCODED_ACCOUNT_SID>
  twilio-auth-token: <BASE64_ENCODED_AUTH_TOKEN>
  twilio-from-phone-number: <BASE64_ENCODED_PHONE_NUMBER>
```

### 3. Aplicar los manifests

```bash
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f hpa.yaml
```

## Verificación

```bash
# Verificar pods
kubectl get pods -n arquitectura

# Verificar servicios
kubectl get services -n arquitectura

# Verificar secrets
kubectl get secrets -n arquitectura

# Ver logs
kubectl logs -f deployment/micronotificaciones-deployment -n arquitectura
```

## Notas de Seguridad
- NUNCA incluir credenciales reales en archivos de Git
- Usar Kubernetes Secrets para credenciales sensibles
- El archivo `secret.yaml` es solo un template