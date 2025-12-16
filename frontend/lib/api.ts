import type { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types/task';

// Usar las API routes de Next.js como puente al backend de Koa
const API_BASE_URL = '/api';

// Obtener todas las tareas
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al obtener las tareas');
  }
  return response.json();
}

// Crear una nueva tarea
export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al crear la tarea');
  }
  return response.json();
}

// Actualizar una tarea
export async function updateTask(
  id: string,
  data: UpdateTaskRequest
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al actualizar la tarea');
  }
  return response.json();
}

