# Frontend - To-Do App

Frontend desarrollado con Next.js 14 y TypeScript que se conecta al backend de Koa.

## Requisitos Previos

- Node.js 18+ 
- Backend de Koa corriendo en `http://localhost:3001`

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env.local` en la raíz del proyecto frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
BACKEND_URL=http://localhost:3001
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Características

- ✅ Formulario para agregar tareas
- ✅ Lista de tareas obtenidas del backend
- ✅ Botón para marcar tareas como completadas
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Tipado estricto con TypeScript
- ✅ API routes de Next.js como puente entre frontend y backend

## Estructura del Proyecto

```
frontend/
├── app/
│   ├── api/           # API routes de Next.js (puente al backend)
│   ├── page.tsx       # Componente principal
│   ├── layout.tsx     # Layout raíz
│   ├── globals.css    # Estilos globales
│   └── page.module.css # Estilos del componente principal
├── lib/
│   └── api.ts         # Funciones para consumir la API
├── types/
│   └── task.ts        # Tipos TypeScript para las tareas
└── package.json
```

## Build para Producción

```bash
npm run build
npm start
```

