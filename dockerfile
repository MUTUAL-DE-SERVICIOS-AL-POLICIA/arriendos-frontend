# Fase de construcción
FROM node:18.12.1 AS build-stage

WORKDIR /app

COPY package*.json .env ./

RUN npm install

COPY . .

RUN npm run build

# Fase de producción
FROM nginx:1.21-alpine AS production-stage

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]