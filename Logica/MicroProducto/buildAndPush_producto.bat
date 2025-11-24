@echo off
cls

echo =========================================
echo Construyendo imagen del Backend: microproductos
echo =========================================

REM Build the Docker image (sin usar cache)
docker build --no-cache -t localhost:5000/microproductos:latest .

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el BUILD de microproductos.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Enviando imagen al registry local
echo =========================================

docker push localhost:5000/microproductos:latest

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el PUSH de microproductos.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Backend completado: microproductos
echo =========================================
pause
