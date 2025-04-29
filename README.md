# Proyecto React Bootstrap DAW

Esta es una plantilla de proyecto React utilizando Vite, TypeScript y React Bootstrap para el curso de desarrollo de aplicaciones web (DAW).

## Sobre el Proyecto

Este proyecto proporciona una base para construir aplicaciones web modernas con:

- React 19
- TypeScript
- Vite como herramienta de construcción
- React Bootstrap para componentes de UI
- Configuración de ESLint para calidad de código

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/yourusername/react-bootstrap-daw.git
cd react-bootstrap-daw
```

2. Instalar dependencias:
```bash
npm install
```

## Ejecutar el Proyecto

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
