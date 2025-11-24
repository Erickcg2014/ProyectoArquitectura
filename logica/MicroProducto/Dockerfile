# Imagen base para compilar
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar el .csproj desde su carpeta real
COPY MicroProducto/MicroProducto.csproj ./MicroProducto/

# Restaurar dependencias
RUN dotnet restore ./MicroProducto/MicroProducto.csproj

# Copiar todo el proyecto
COPY MicroProducto/ ./MicroProducto/

# Publicar
RUN dotnet publish ./MicroProducto/MicroProducto.csproj -c Release -o /publish

# Imagen final para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /publish

COPY --from=build /publish .

EXPOSE 8083

# Configurar la aplicación para escuchar en el puerto 8083
ENV ASPNETCORE_URLS=http://+:8083

ENTRYPOINT ["dotnet", "MicroProducto.dll"]