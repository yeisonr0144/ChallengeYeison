# challengeyeison.client/Dockerfile

# Etapa 1: Build del frontend
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Para pruebas
FROM node:18 AS test
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "run", "test", "--", "--coverage"]

# Etapa 3: Producción (Nginx)
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
