# Arriendos - frontend

Leasing system for the MUSERPOL
This project uses React + vite with TypeScript

## Required in local

- Node v18.12.1

## Steps with docker

### Container construction

- Build the image

```sh
docker build -t alquileres:v1 -
```

- Run the container

```sh
docker run -d -p 83:80 alquileres:v1
```

