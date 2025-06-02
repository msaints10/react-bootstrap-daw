# Frontend - React + TypeScript + Bootstrap

Frontend desarrollado con React 19, TypeScript, Vite y React Bootstrap para la gestión de tareas y metas.

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Navegar a la carpeta frontend:**
```bash
cd frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

## 🏃‍♂️ Ejecutar el proyecto

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm run build
npm run preview
```

El servidor se ejecutará en `http://localhost:5173/` (o el puerto disponible)

## 🗺️ Rutas de la aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `HomePage` | Página principal con navegación |
| `/tasks` | `TasksPage` | Gestión de tareas |
| `/goals` | `GoalsPage` | Gestión de metas |
| `*` | `NotFoundPage` | Página 404 para rutas no encontradas |

## 🧩 Componentes principales

### Páginas (Pages)
- **HomePage**: Landing page con navegación a tasks y goals
- **TasksPage**: Página para gestionar tareas
- **GoalsPage**: Página para gestionar metas  
- **NotFoundPage**: Página de error 404

### Componentes (Components)
- **Menu**: Navegación principal con React Router
- **Todos**: Componente para gestionar tareas (Redux)
- **Goals**: Componente para gestionar metas (Redux)
- **List**: Componente reutilizable para mostrar listas
- **Formulario**: Formulario para añadir elementos
- **Item**: Componente individual de lista

## 🎨 Estilos y UI

### Tecnologías utilizadas:
- **React Bootstrap**: Componentes de UI
- **Bootstrap Icons**: Iconografía
- **SCSS**: Preprocesador CSS
- **CSS personalizado**: Animaciones y estilos específicos

### Características de diseño:
- ✅ Diseño responsivo
- ✅ Modo oscuro compatible
- ✅ Animaciones suaves
- ✅ Hover effects
- ✅ Icons con Bootstrap Icons

## 🔄 Estado de la aplicación

### Redux Toolkit
La aplicación usa Redux Toolkit para el manejo del estado global:

- **todoSlice**: Estado de tareas
- **goalsSlice**: Estado de metas
- **store**: Configuración del store

### Estructura del estado:
```typescript
interface RootState {
  todos: {
    value: Todo[]
  },
  goals: {
    value: Goal[]
  }
}
```

## 📁 Estructura del proyecto

```
frontend/
├── src/
│   ├── App.tsx                 # Router principal
│   ├── main.tsx                # Punto de entrada
│   ├── store.ts                # Configuración Redux
│   ├── components/             # Componentes reutilizables
│   │   ├── Menu/               # Navegación
│   │   ├── todos.tsx           # Gestión de tareas
│   │   ├── goals.tsx           # Gestión de metas
│   │   └── ...                 # Otros componentes
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── HomePage.tsx        # Página principal
│   │   ├── TasksPage.tsx       # Página de tareas
│   │   ├── GoalsPage.tsx       # Página de metas
│   │   └── NotFoundPage.tsx    # Página 404
│   ├── reducers/               # Slices de Redux
│   │   ├── todoSlice.ts        # Estado de tareas
│   │   └── goalsSlice.ts       # Estado de metas
│   ├── styles/                 # Estilos personalizados
│   │   └── pages.css           # Estilos de páginas
│   └── scss/                   # Estilos SCSS
│       └── styles.scss         # Estilos principales
├── package.json                # Dependencias y scripts
└── vite.config.ts              # Configuración Vite
```

## 🔧 Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Previsualizar build de producción
npm run lint       # Ejecutar ESLint
```

## 🌐 Navegación

### React Router
La aplicación usa React Router DOM para navegación SPA:

- **BrowserRouter**: Router principal
- **Routes/Route**: Definición de rutas
- **Link**: Navegación entre páginas
- **useLocation**: Hook para obtener ruta actual

### Características de navegación:
- ✅ URLs amigables
- ✅ Navegación sin recarga de página
- ✅ Indicador visual de página activa
- ✅ Manejo de rutas no encontradas
- ✅ Breadcrumbs automáticos

## 🎯 Características principales

1. **Enrutamiento SPA completo**
2. **Gestión de estado con Redux**
3. **UI moderna con React Bootstrap**
4. **TypeScript para type safety**
5. **Responsive design**
6. **Animaciones CSS**
7. **Icons con Bootstrap Icons**
8. **Página 404 personalizada**

## 🚨 Troubleshooting

### Error: "Module not found"
- Ejecuta `npm install` para instalar dependencias
- Verifica que todas las rutas de importación sean correctas

### Error de compilación TypeScript
- Verifica la configuración en `tsconfig.json`
- Asegúrate de que todos los tipos estén correctamente definidos

### Estilos no se cargan
- Verifica que Bootstrap esté importado en `main.tsx`
- Confirma que los archivos CSS estén en las rutas correctas

### Navegación no funciona
- Asegúrate de que `react-router-dom` esté instalado
- Verifica que `BrowserRouter` envuelva toda la aplicación
