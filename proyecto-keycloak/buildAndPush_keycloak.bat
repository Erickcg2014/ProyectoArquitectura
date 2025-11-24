@echo off
cls

echo =========================================
echo Construyendo imagen de Keycloak
echo =========================================

REM Build the Docker image (sin usar cache)
docker build --no-cache -t localhost:5000/keycloak:latest .

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el BUILD de Keycloak.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Enviando imagen al registry configurado
echo =========================================

docker push localhost:5000/keycloak:latest

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el PUSH de Keycloak.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Keycloak completado
echo =========================================
pause
