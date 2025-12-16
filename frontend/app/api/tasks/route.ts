import { NextRequest, NextResponse } from 'next/server';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types/task';

const BACKEND_URL: string = process.env.BACKEND_URL || 'http://localhost:3001';

// GET - Obtener todas las tareas
export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/tasks`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al obtener las tareas' },
        { status: response.status }
      );
    }

    const tasks: Task[] = await response.json();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error en GET /api/tasks:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el backend' },
      { status: 500 }
    );
  }
}

// POST - Crear una nueva tarea
export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskRequest = await request.json();

    if (!body.title || body.title.trim() === '') {
      return NextResponse.json(
        { error: 'El título de la tarea no puede estar vacío' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error al crear la tarea' },
        { status: response.status }
      );
    }

    const task: Task = await response.json();
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/tasks:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el backend' },
      { status: 500 }
    );
  }
}

