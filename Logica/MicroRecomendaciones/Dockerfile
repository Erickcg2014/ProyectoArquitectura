FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY MicroRecomendaciones.csproj ./
RUN dotnet restore MicroRecomendaciones.csproj

COPY . ./
RUN dotnet publish MicroRecomendaciones.csproj -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /publish

COPY --from=build /publish .

EXPOSE 8088
ENV ASPNETCORE_URLS=http://+:8088

ENTRYPOINT ["dotnet", "MicroRecomendaciones.dll"]