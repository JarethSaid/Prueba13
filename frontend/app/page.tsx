'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/types/task';
import { getTasks, createTask, updateTask } from '@/lib/api';
import styles from './page.module.css';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente esté montado antes de hacer llamadas
  useEffect(() => {
    setMounted(true);
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Evitar hidratación hasta que el componente esté listo
  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!newTaskTitle.trim()) {
      setError('Por favor ingresa un título para la tarea');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const newTask = await createTask({ title: newTaskTitle.trim() });
      setTasks((prev: Task[]) => [newTask, ...prev]);
      setNewTaskTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea');
      console.error('Error creating task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });
      setTasks((prev: Task[]) =>
        prev.map((t: Task) => (t.id === task.id ? updatedTask : t))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
      console.error('Error updating task:', err);
    }
  };

  // Calcular tareas pendientes
  const pendingTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Lista de Tareas</h1>

        {/* Contador de tareas pendientes */}
        {!loading && tasks.length > 0 && (
          <div className={styles.counter}>
            <span className={styles.counterText}>
              {pendingTasksCount === 1
                ? '1 tarea pendiente'
                : `${pendingTasksCount} tareas pendientes`}
            </span>
          </div>
        )}

        {/* Formulario para agregar tarea */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nueva tarea..."
            className={styles.input}
            disabled={submitting}
            maxLength={200}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={submitting || !newTaskTitle.trim()}
          >
            {submitting ? 'Agregando...' : 'Agregar'}
          </button>
        </form>

        {/* Mensaje de error */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Lista de tareas */}
        <div className={styles.tasksContainer}>
          {loading ? (
            <div className={styles.loading}>Cargando tareas...</div>
          ) : tasks.length === 0 ? (
            <div className={styles.empty}>
              No hay tareas. ¡Agrega una para comenzar!
            </div>
          ) : (
            <ul className={styles.tasksList}>
              {tasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`${styles.checkbox} ${
                      task.completed ? styles.completed : ''
                    }`}
                    aria-label={
                      task.completed
                        ? 'Marcar como no completada'
                        : 'Marcar como completada'
                    }
                  >
                    {task.completed && <span className={styles.checkmark}>✓</span>}
                  </button>
                  <span
                    className={`${styles.taskTitle} ${
                      task.completed ? styles.taskCompleted : ''
                    }`}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

