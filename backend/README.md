# To-Do Backend API

Backend API construido con Koa, TypeScript y Prisma para gestionar tareas.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copia `.env.example` a `.env`
2. Configura tu `DATABASE_URL` de Neon
3. Ejecuta las migraciones:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## 🏃 Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints

### GET /tasks
Obtiene todas las tareas.

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "title": "Task title",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /tasks
Crea una nueva tarea.

**Body:**
```json
{
  "title": "Task title"
}
```

**Respuesta:**
```json
{
  "id": "uuid",
  "title": "Task title",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### PUT /tasks/:id
Actualiza una tarea (marca como completada).

**Body:**
```json
{
  "completed": true
}
```

**Respuesta:**
```json
{
  "id": "uuid",
  "title": "Task title",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```


