@echo off
cls

echo =========================================
echo Construyendo imagen del API Gateway
echo =========================================

REM Build the Docker image (sin usar cache)
docker build --no-cache -t localhost:5000/api-gateway:latest .

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el BUILD del API Gateway.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Enviando imagen al registry configurado
echo =========================================

docker push localhost:5000/api-gateway:latest

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el PUSH del API Gateway.
    pause
    exit /b 1
)

echo.
echo =========================================
echo API Gateway completado
echo =========================================
pause
