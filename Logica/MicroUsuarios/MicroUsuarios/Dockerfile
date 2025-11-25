# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar el archivo del proyecto y restaurar dependencias
COPY ["MicroUsuarios.csproj", "./"]
RUN dotnet restore "MicroUsuarios.csproj"

# Copiar todo el código fuente
COPY . .

# Build de la aplicación
RUN dotnet build "MicroUsuarios.csproj" -c Release -o /app/build

# Etapa 2: Publish
FROM build AS publish
RUN dotnet publish "MicroUsuarios.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Etapa 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Exponer el puerto
EXPOSE 8080

# Copiar los archivos publicados
COPY --from=publish /app/publish .

# Punto de entrada
ENTRYPOINT ["dotnet", "MicroUsuarios.dll"]