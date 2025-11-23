# ==========================
# 1️⃣ Etapa de compilación
# ==========================
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente
COPY src ./src

# Compilar el proyecto
RUN mvn clean package -DskipTests

# ==========================
# 2️⃣ Etapa de ejecución
# ==========================
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copiar el JAR generado desde la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# Puerto expuesto del backend
EXPOSE 8081

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]
