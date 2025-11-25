@echo off
cls

echo =========================================
echo Construyendo imagen del Microservicio: MicroUsuarios
echo =========================================

REM Build the Docker image (sin usar cache)
docker build --no-cache -t localhost:5000/microusuarios:latest .

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el BUILD de microusuarios.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Enviando imagen al registry local
echo =========================================

docker push localhost:5000/microusuarios:latest

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el PUSH de microusuarios.
    pause
    exit /b 1
)

echo.
echo =========================================
echo ✅ Microservicio completado: microusuarios
echo =========================================
pause