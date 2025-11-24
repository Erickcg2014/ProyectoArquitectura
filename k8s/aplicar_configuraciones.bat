@echo off
cls

echo ============================================
echo    APLICANDO CONFIGURACIONES KUBERNETES
echo ============================================

rem -------------------------------
rem 1. Crear namespace si no existe
rem -------------------------------
echo.
echo 🔹 Verificando namespace 'javemarket'...
kubectl get namespace javemarket >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ➕ Creando namespace 'javemarket'...
    kubectl create namespace javemarket
) ELSE (
    echo ✔ Namespace 'javemarket' ya existe.
)

rem -------------------------------------
rem 2. Verificar / instalar Ingress NGINX
rem -------------------------------------
echo.
echo 🔹 Verificando NGINX Ingress Controller...

kubectl get pods -n ingress-nginx >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ➕ Instalando ingress-nginx controller...
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
    echo ⏳ Esperando a que ingress-nginx inicie...
    timeout /t 20 >nul
) ELSE (
    echo ✔ Ingress-nginx ya está instalado.
)

rem -----------------------------------------------
rem 3. Aplicar todos los manifiestos de despliegue
rem -----------------------------------------------
echo.
echo ============================================
echo      APLICANDO MANIFIESTOS DEL PROYECTO
echo ============================================

echo.
echo 🔹 Aplicando presentacion_deployment.yaml...
kubectl apply -f presentacion_deployment.yaml

echo.
echo 🔹 Aplicando api_gateway_deployment.yaml...
kubectl apply -f api_gateway_deployment.yaml

echo.
echo 🔹 Aplicando keycloak_deployment.yaml...
kubectl apply -f keycloak_deployment.yaml

echo.
echo 🔹 Aplicando microcarrito_deployment.yaml...
kubectl apply -f microcarrito_deployment.yaml

echo.
echo 🔹 Aplicando microproductos.yaml...
kubectl apply -f microproductos.yaml

echo.
echo 🔹 Aplicando ingress.yaml...
kubectl apply -f ingress.yaml

echo.
echo ============================================
echo          CONFIGURACIÓN FINALIZADA
echo ============================================
pause
