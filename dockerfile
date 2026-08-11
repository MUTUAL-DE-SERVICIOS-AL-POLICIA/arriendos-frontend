# Fase de construcción
FROM node:18 AS build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . .

RUN npx vite build

# Fase de producción
FROM nginx:1.21-alpine AS production-stage

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
