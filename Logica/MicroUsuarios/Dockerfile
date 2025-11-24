FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY MicroUsuarios.csproj ./
RUN dotnet restore MicroUsuarios.csproj

COPY . ./
RUN dotnet publish MicroUsuarios.csproj -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /publish

COPY --from=build /publish .

EXPOSE 8084
ENV ASPNETCORE_URLS=http://+:8084

ENTRYPOINT ["dotnet", "MicroUsuarios.dll"]