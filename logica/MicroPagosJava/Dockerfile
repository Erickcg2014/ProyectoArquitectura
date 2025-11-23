FROM openjdk:17

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven && mvn clean package -DskipTests

EXPOSE 8086

CMD ["java", "-jar", "target/micropagos-0.0.1-SNAPSHOT.jar"]