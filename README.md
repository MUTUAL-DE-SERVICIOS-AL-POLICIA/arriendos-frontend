# Arriendos - Frontend

Sistema de gestion de arriendos de ambientes de MUSERPOL. Frontend desarrollado con React 18, TypeScript y Vite.

## Requisitos

- Node.js 18.12.1+
- npm o yarn

---

## Instalacion Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/MUTUAL-DE-SERVICIOS-AL-POLICIA/arriendos-frontend.git
cd arriendos-frontend
```

### 2. Configurar variables de entorno

Crear archivo `.env`:

```bash
# IP del backend
VITE_HOST_BACKEND="http://localhost:9005/"

# IP y puerto del frontend
VITE_HOST='localhost'
VITE_PORT='9006'
```

### 3. Instalar dependencias y ejecutar

```bash
npm install
npm run dev
```

### 4. Verificar

Abrir `http://localhost:9006` en el navegador.

---

## Despliegue con Docker

### Construir la imagen

El frontend usa un build multi-stage: Node para compilar, nginx para servir.

```bash
docker build -t arriendos-frontend:latest .
```

### Ejecutar el contenedor

```bash
docker run -d \
  --name arriendos-frontend \
  -p 9006:80 \
  arriendos-frontend:latest
```

### Verificar

Abrir `http://localhost:9006` en el navegador.

### Configuracion del backend en produccion

En produccion, el frontend necesita saber la URL del backend. Editar el archivo `.env` antes del build:

```bash
VITE_HOST_BACKEND="http://<IP_DEL_BACKEND>:9005/"
```

Reconstruir la imagen despues del cambio:

```bash
docker build -t arriendos-frontend:latest .
docker stop arriendos-frontend && docker rm arriendos-frontend
docker run -d --name arriendos-frontend -p 9006:80 arriendos-frontend:latest
```

---

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de produccion (TypeScript + Vite) |
| `npm run preview` | Vista previa del build de produccion |
| `npm run lint` | Verificar codigo con ESLint |
| `npm run test` | Ejecutar tests unitarios (Vitest) |
| `npm run test:watch` | Ejecutar tests en modo watch |

---

## Estructura del Proyecto

```
arriendos-frontend/
├── src/
│   ├── assets/              # Imagenes, fuentes
│   ├── components/          # Componentes reutilizables (Input, Button, Table, etc.)
│   ├── helpers/             # Funciones utilitarias
│   ├── hooks/               # Custom hooks (useAuthStore, useRentalStore, etc.)
│   ├── models/              # Interfaces TypeScript
│   ├── router/              # Rutas y ProtectedRoute
│   ├── services/            # Configuracion de Axios (coffeApi)
│   ├── store/               # Redux slices
│   └── views/               # Paginas y componentes de vista
│       ├── layout/          # Layout principal (SideNav, TopNav)
│       └── pages/           # Paginas por modulo
│           ├── calendar/    # Calendario principal
│           ├── customers/   # Gestion de clientes
│           ├── financials/  # Gestion de pagos/garantias
│           ├── products/    # Gestion de productos
│           ├── properties/  # Gestion de inmuebles
│           ├── rental/      # Lista de arriendos
│           ├── reports/     # Reportes PDF/Excel
│           └── users/       # Gestion de usuarios/roles
├── dockerfile               # Configuracion Docker (multi-stage)
├── default.conf             # Configuracion nginx
└── vite.config.ts           # Configuracion Vite
```

---

## Comunicacion con el Backend

El frontend se comunica con el backend via REST API. La instancia Axios (`coffeApi`) esta configurada con:

- **Base URL:** `VITE_HOST_BACKEND + "api"` (ej: `http://localhost:9005/api`)
- **JWT Interceptor:** Agrega automaticamente el token de autenticacion a cada request
- **Auto-logout:** Redirige al login si el token expira (401)

### Puertos por defecto

| Servicio | Puerto |
|----------|--------|
| Backend (Django) | 9005 |
| Frontend (Vite dev) | 9006 |
| Frontend (Docker/nginx) | 80 (mapeado a 9006) |
