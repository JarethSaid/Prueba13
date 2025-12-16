import Router from "@koa/router";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller";

const router = new Router();

// GET /tasks — listar tareas
router.get("/tasks", getTasks);
// POST /tasks — crear tarea
router.post("/tasks", createTask);
// PUT /tasks/:id — actualizar tarea
router.put("/tasks/:id", updateTask);

export default router;
