# Arriendos - frontend

Leasing system for the MUSERPOL
This project uses React + vite with TypeScript

## Required in local

- use nvm 18.12.1
- yarn 1.22.19

## Steps development

- 1st Create ".env" file
- 2nd Change variables in development or production mode
- 3rd Run "yarn"
- 4th Run "yarn dev"

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

