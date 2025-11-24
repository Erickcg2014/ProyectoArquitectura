@echo off
cls

echo =========================================
echo Construyendo imagen del Frontend: presentacion
echo =========================================

docker build --no-cache -t localhost:5000/frontend:latest .

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el BUILD del frontend.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Enviando imagen al registry configurado
echo =========================================

docker push localhost:5000/frontend:latest

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Fallo en el PUSH del frontend.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Frontend completado: presentacion
echo =========================================
pause
