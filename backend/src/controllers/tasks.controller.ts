import type { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lista todas las tareas (más recientes primero)
export const getTasks = async (ctx: Context) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    ctx.body = tasks;
    ctx.status = 200;
  } catch (error) {
    console.error("GET /tasks error:", error);
    ctx.status = 500;
    ctx.body = {
      error: "Error fetching tasks",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
};

// Crea una nueva tarea
export const createTask = async (ctx: Context) => {
  try {
    const { title } = ctx.request.body as { title: string };

    if (!title || title.trim() === "") {
      ctx.status = 400;
      ctx.body = { error: "Task title cannot be empty" };
      return;
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        completed: false,
      },
    });

    ctx.body = task;
    ctx.status = 201;
  } catch (error) {
    console.error("POST /tasks error:", error);
    ctx.status = 500;
    ctx.body = {
      error: "Error creating task",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
};

// Actualiza el estado (completed) de una tarea por id
export const updateTask = async (ctx: Context) => {
  try {
    const { id } = ctx.params as { id: string };
    const { completed } = ctx.request.body as { completed?: boolean };

    const task = await prisma.task.update({
      where: { id },
      data: {
        completed: completed !== undefined ? completed : true,
      },
    });

    ctx.body = task;
    ctx.status = 200;
  } catch (error) {
    console.error("PUT /tasks/:id error:", error);
    ctx.status = 404;
    ctx.body = {
      error: "Task not found or DB error",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
};

// Cierra la conexión a la base de datos al terminar el proceso
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
