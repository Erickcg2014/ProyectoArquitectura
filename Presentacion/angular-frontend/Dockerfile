# ==========================
# Etapa 1: Compilación Angular
# ==========================
FROM node:20 AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar TODO el código fuente
COPY . .

# Build de producción
RUN npx ng build --configuration production --base-href=/

# Verificar que el build se generó
RUN echo "=== Listando archivos generados ===" && \
    ls -lh /app/dist/angular-frontend/ && \
    echo "=== CSS generado ===" && \
    find /app/dist/angular-frontend/ -name "*.css" -exec ls -lh {} \;

# ==========================
# Etapa 2: Servidor NGINX
# ==========================
FROM nginx:alpine

# Eliminar archivos default de nginx
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build de Angular desde la etapa anterior
COPY --from=build /app/dist/angular-frontend /usr/share/nginx/html

# Verificar que los archivos se copiaron
RUN echo "=== Archivos en nginx ===" && \
    ls -lh /usr/share/nginx/html/ && \
    echo "=== CSS en nginx ===" && \
    find /usr/share/nginx/html/ -name "*.css" -exec ls -lh {} \;

# Crear usuario no-root para mayor seguridad
RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
