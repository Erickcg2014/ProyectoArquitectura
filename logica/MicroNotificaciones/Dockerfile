# Imagen base para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar el .csproj desde su carpeta real
COPY MicroNotificaciones.csproj ./

# Restaurar dependencias
RUN dotnet restore MicroNotificaciones.csproj

# Copiar todo el proyecto
COPY . ./

# Publicar
RUN dotnet publish MicroNotificaciones.csproj -c Release -o /publish

# Imagen final para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /publish

COPY --from=build /publish .

EXPOSE 8082

# Configurar la aplicación para escuchar en el puerto 8082
ENV ASPNETCORE_URLS=http://+:8082

ENTRYPOINT ["dotnet", "MicroNotificaciones.dll"]