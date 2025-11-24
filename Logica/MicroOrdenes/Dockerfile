# Imagen base para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar el .csproj
COPY MicroOrdenes.csproj ./

# Restaurar dependencias
RUN dotnet restore MicroOrdenes.csproj

# Copiar todo el proyecto
COPY . ./

# Publicar
RUN dotnet publish MicroOrdenes.csproj -c Release -o /publish

# Imagen final para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /publish

COPY --from=build /publish .

EXPOSE 8083

# Configurar la aplicación para escuchar en el puerto 8083
ENV ASPNETCORE_URLS=http://+:8083

ENTRYPOINT ["dotnet", "MicroOrdenes.dll"]