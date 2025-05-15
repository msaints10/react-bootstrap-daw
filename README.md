# Proyecto React Bootstrap DAW

Esta es una aplicación web completa que consta de un backend en Node.js y un frontend en React, utilizando TypeScript y React Bootstrap para el curso de desarrollo de aplicaciones web (DAW).

## Sobre el Proyecto

Este proyecto proporciona una base para construir aplicaciones web modernas con:

- Backend con Node.js y Express
- Frontend con React 19 y TypeScript
- Vite como herramienta de construcción
- React Bootstrap para componentes de UI
- Configuración de ESLint para calidad de código

## Backend

### Instalación

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Generar clave secreta:
```bash
cd utils
node create_secretkey.js
cd ..
```

### Ejecutar el Proyecto Backend

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

Para iniciar en modo producción:
```bash
npm start
```

### Documentación de la API

# Authorization

Se debe de incluir el Authorization en el header de la petición. Debe ser igual al secret_key generado.

# Endpoints disponibles
- `GET /getTasks` - Obtiene todas las tareas
- `GET /getGoals` - Obtiene todas las metas
- `POST /addTask` - Añade una nueva tarea
parametros body:
  - `title`: Título de la tarea
  - `dueDate`: Fecha de vencimiento de la tarea
- `POST /addGoal` - Añade una nueva meta
parametros body:
  - `title`: Título de la tarea
  - `dueDate`: Fecha de vencimiento de la tarea
- `POST /removeTask/:id` - Elimina una tarea
parametros head:
  - `id`: ID de la tarea a eliminar
- `POST /removeGoal/:id` - Elimina una meta
parametros head:
  - `id`: ID de la meta a eliminar
- 

## Frontend

### Instalación

1. Navegar a la carpeta frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

### Ejecutar el Proyecto Frontend

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

Para construir para producción:
```bash
npm run build
```

Para previsualizar la compilación de producción:
```bash
npm run preview
```

## Configuración del Proyecto

El proyecto incluye:

- Configuración de TypeScript (`tsconfig.json`)
- Configuración de Vite para construcciones rápidas y HMR
- Configuración de ESLint para calidad de código
- React Bootstrap para componentes de UI responsive

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la compilación de producción
- `npm run lint` - Ejecuta ESLint
- `npm run preview` - Previsualiza la compilación de producción

## Configuración de ESLint

Para una verificación de tipos mejorada y reglas específicas de React, el proyecto utiliza:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
  ],
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  }
})
```
