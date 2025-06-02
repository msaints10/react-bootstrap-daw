# Multi-stage build para optimizar la imagen final
FROM node:22.15-alpine AS builder

# Crear directorios de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar cache de Docker)
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm ci --only=production

# Instalar dependencias del frontend
WORKDIR /app/frontend
RUN npm ci

# Copiar el código fuente
WORKDIR /app
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Construir el frontend
WORKDIR /app/frontend
RUN npm run build

# Etapa final
FROM node:22.15-alpine

# Instalar nginx
RUN apk add --no-cache nginx

# Crear directorios necesarios
RUN mkdir -p /var/www/html

# Copiar aplicación construida desde la etapa builder
COPY --from=builder /app/backend /app/backend
COPY --from=builder /app/frontend/dist /var/www/html

# Copiar archivos de configuración
COPY nginx.conf /etc/nginx/nginx.conf

# Crear script de inicio
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'cd /app/backend && node src/index.js &' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Configurar variables de entorno para backend
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto 4000
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["/start.sh"]