import { NextRequest, NextResponse } from 'next/server';
import type { Task, UpdateTaskRequest } from '@/types/task';

const BACKEND_URL: string = process.env.BACKEND_URL || 'http://localhost:3001';

// PUT - Actualizar una tarea
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateTaskRequest = await request.json();
    const { id } = params;

    const response = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error al actualizar la tarea' },
        { status: response.status }
      );
    }

    const task: Task = await response.json();
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error en PUT /api/tasks/[id]:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el backend' },
      { status: 500 }
    );
  }
}

