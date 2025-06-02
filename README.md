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

3. Configurar variables de entorno:
```bash
# Copiar el archivo de ejemplo
Copy-Item .env.example .env

# O en sistemas Unix/Linux/Mac:
# cp .env.example .env
```

4. Generar clave secreta:
```bash
cd utils
node create_secretkey.js
cd ..
```

5. Actualizar el archivo `.env` con los valores apropiados:
   - Copia la clave secreta generada y reemplaza `tu_clave_secreta_aqui` en la variable `SECRET_KEY`
   - Configura tu URL de MongoDB en `MONGODB_URI` si usas una instancia diferente

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
- `GET /tasks/getTasks` - Obtiene todas las tareas
- `GET /goals/getGoals` - Obtiene todas las metas
- `POST /tasks/addTask` - Añade una nueva tarea
Parámetros body:
  - `name`: Nombre de la tarea
  - `description`: Descripción de la tarea
  - `dueDate`: Fecha de vencimiento de la tarea
- `POST /goals/addGoal` - Añade una nueva meta
Parámetros body:
  - `name`: Nombre de la meta
  - `description`: Descripción de la meta
  - `dueDate`: Fecha de vencimiento de la meta
- `DELETE /tasks/removeTask/:id` - Elimina una tarea
Parámetros URL:
  - `id`: ID de la tarea a eliminar
- `DELETE /goals/removeGoal/:id` - Elimina una meta
Parámetros URL:
  - `id`: ID de la meta a eliminar

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
