@echo off
cls

echo ============================================
echo    APLICANDO CONFIGURACIONES KUBERNETES
echo ============================================

rem -------------------------------
rem 1. Crear namespace si no existe
rem -------------------------------
echo.
echo Verificando namespace 'arquitectura'...
kubectl get namespace arquitectura >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Creando namespace 'arquitectura'...
    kubectl create namespace arquitectura
) ELSE (
    echo Namespace 'arquitectura' ya existe.
)

rem -----------------------------------------------
rem 2. Aplicar secrets primero (si existen)
rem -----------------------------------------------

echo.
echo ============================================
echo         APLICANDO SECRETS
echo ============================================

echo.
echo === 1. Eliminando Secret 'micronotificaciones-secrets'...
kubectl delete secret micronotificaciones-secrets --namespace=arquitectura --ignore-not-found=true

echo.
echo === 2. Creando Secret 'micronotificaciones-secrets' desde el archivo .env...
kubectl create secret generic micronotificaciones-secrets ^
    --from-env-file=.env ^
    --namespace=arquitectura

rem -----------------------------------------------
rem 3. Aplicar los despliegues de microservicios
rem -----------------------------------------------

echo.
echo ============================================
echo      APLICANDO MANIFIESTOS DEL PROYECTO
echo ============================================

echo  Aplicando presentacion_deployment.yaml...
kubectl apply -f presentacion_deployment.yaml

echo.
echo  Aplicando api_gateway_deployment.yaml...
kubectl apply -f api_gateway_deployment.yaml

echo. 
echo Aplicando postgres_keycloak.yaml...
kubectl apply -f postgres_keycloak.yaml
echo.
echo  Aplicando keycloak_deployment.yaml...
kubectl apply -f keycloak_deployment.yaml

echo.
echo  Aplicando microcarrito_deployment.yaml...
kubectl apply -f microcarrito_deployment.yaml

echo.
echo  Aplicando microproductos_deployment.yaml...
kubectl apply -f microproductos_deployment.yaml

echo.
echo  Aplicando micropagos_deployment.yaml...
kubectl apply -f micropagos_deployment.yaml

echo.
echo  Aplicando microordenes_deployment.yaml...
kubectl apply -f microordenes_deployment.yaml

echo.
echo  Aplicando micro_notificaciones_deployment.yaml...
kubectl apply -f micro_notificaciones_deployment.yaml

echo.
echo  Aplicando microusuarios_deployment.yaml...
kubectl apply -f microusuarios_deployment.yaml

echo.
echo ============================================
echo          CONFIGURACION FINALIZADA
echo ============================================
pause
