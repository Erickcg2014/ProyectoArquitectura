# ==========================
# Imagen simplificada - copiar JAR pre-compilado
# ==========================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el JAR compilado desde el host
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Verificar que el JAR existe
RUN ls -la app.jar

# Puerto expuesto del backend
EXPOSE 8081

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]
