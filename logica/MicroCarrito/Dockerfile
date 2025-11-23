# Imagen base para compilar
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar el .csproj desde su carpeta real
COPY MicroCarrito/MicroCarrito.csproj ./MicroCarrito/

# Restaurar dependencias
RUN dotnet restore ./MicroCarrito/MicroCarrito.csproj

# Copiar todo el proyecto
COPY MicroCarrito/ ./MicroCarrito/

# Publicar
RUN dotnet publish ./MicroCarrito/MicroCarrito.csproj -c Release -o /publish

# Imagen final para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /publish

COPY --from=build /publish .

EXPOSE 8087

# Configurar la aplicación para escuchar en el puerto 8083
ENV ASPNETCORE_URLS=http://+:8087

ENTRYPOINT ["dotnet", "MicroCarrito.dll"]