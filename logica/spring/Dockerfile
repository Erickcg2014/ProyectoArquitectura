# ==========================
# Imagen para ejecución usando JAR precompilado
# ==========================
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copiar el JAR generado localmente (asegúrate de compilar localmente primero)
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Puerto expuesto del backend
EXPOSE 8081

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]
