# Backend - API REST

Backend desarrollado con Node.js, Express y MongoDB para la gestión de tareas y metas.

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### Pasos de instalación

1. **Navegar a la carpeta backend:**
```bash
cd backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
# En Windows (PowerShell)
Copy-Item .env.example .env

# En Unix/Linux/Mac
cp .env.example .env
```

4. **Generar clave secreta:**
```bash
cd utils
node create_secretkey.js
cd ..
```

5. **Configurar el archivo `.env`:**
Abre el archivo `.env` y configura las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# Clave secreta (copia la generada en el paso anterior)
SECRET_KEY=tu_clave_secreta_generada

# URL de MongoDB
MONGO_URI=mongodb://localhost:27017/react-bootstrap-daw

# Nombre de la base de datos
DB_NAME=react-bootstrap-daw

# Entorno
NODE_ENV=development
```

## 🏃‍♂️ Ejecutar el proyecto

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` (o el puerto configurado en `.env`)

## 📋 Variables de entorno

| Variable | Descripción | Valor por defecto | Requerida |
|----------|-------------|------------------|-----------|
| `PORT` | Puerto del servidor | 3000 | No |
| `SECRET_KEY` | Clave para autenticación API | - | ✅ Sí |
| `MONGO_URI` | URL conexión MongoDB | mongodb://localhost:27017/react-bootstrap-daw | ✅ Sí |
| `DB_NAME` | Nombre de la base de datos | react-bootstrap-daw | No |
| `NODE_ENV` | Entorno de ejecución | development | No |

## 🔐 Autenticación

La API requiere autenticación mediante API Key. Incluye el header `Authorization` en todas las peticiones a endpoints protegidos:

```bash
Authorization: tu_clave_secreta_aqui
```

## 📚 API Endpoints

### Tareas (Tasks)

| Método | Endpoint | Descripción | Protegido |
|--------|----------|-------------|-----------|
| GET | `/tasks/getTasks` | Obtener todas las tareas | ✅ |
| POST | `/tasks/addTask` | Crear nueva tarea | ✅ |
| DELETE | `/tasks/removeTask/:id` | Eliminar tarea | ✅ |

### Metas (Goals)

| Método | Endpoint | Descripción | Protegido |
|--------|----------|-------------|-----------|
| GET | `/goals/getGoals` | Obtener todas las metas | ✅ |
| POST | `/goals/addGoal` | Crear nueva meta | ✅ |
| DELETE | `/goals/removeGoal/:id` | Eliminar meta | ✅ |

### Ejemplo de uso

#### Crear una tarea:
```bash
curl -X POST http://localhost:3000/tasks/addTask \
  -H "Content-Type: application/json" \
  -H "Authorization: tu_clave_secreta" \
  -d '{
    "name": "Completar proyecto",
    "description": "Finalizar el desarrollo del backend",
    "dueDate": "2025-06-15"
  }'
```

#### Obtener todas las tareas:
```bash
curl -X GET http://localhost:3000/tasks/getTasks \
  -H "Authorization: tu_clave_secreta"
```

## 🗄️ Base de datos

El proyecto utiliza MongoDB con Mongoose como ODM. Las colecciones creadas son:

- **tasks**: Almacena las tareas
- **goals**: Almacena las metas

### Modelos

#### Task Schema
```javascript
{
  name: String (required),
  description: String (required),
  dueDate: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### Goal Schema
```javascript
{
  name: String (required),
  description: String (required),
  dueDate: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Scripts disponibles

```bash
npm run dev    # Ejecutar en modo desarrollo con nodemon
npm start      # Ejecutar en modo producción
```

## 📁 Estructura del proyecto

```
backend/
├── config/
│   └── db.js           # Configuración de MongoDB
├── models/
│   ├── tasks.js        # Modelo de tareas
│   └── goals.js        # Modelo de metas
├── routes/
│   ├── index.js        # Rutas principales
│   ├── tasks.js        # Rutas de tareas
│   └── goals.js        # Rutas de metas
├── src/
│   └── index.js        # Archivo principal del servidor
├── utils/
│   └── create_secretkey.js  # Generador de claves secretas
├── views/
│   └── docs.pug        # Vista de documentación
├── .env.example        # Ejemplo de variables de entorno
└── package.json        # Dependencias y scripts
```

## 🚨 Troubleshooting

### Error: "Unauthorized - invalid or missing API key"
- Verifica que el header `Authorization` esté incluido
- Asegúrate de que la clave secreta sea correcta

### Error de conexión a MongoDB
- Verifica que MongoDB esté ejecutándose
- Comprueba la URL de conexión en `MONGO_URI`
- Para MongoDB Atlas, verifica las credenciales y whitelist de IPs

### Puerto ya en uso
- Cambia el puerto en el archivo `.env`
- O termina el proceso que está usando el puerto: `netstat -ano | findstr :3000`
