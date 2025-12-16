import dotenv from "dotenv";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "@koa/bodyparser";
import tasksRouter from "./routes/tasks.routes";

dotenv.config();

const app = new Koa();

// Middlewares globales
app.use(cors());
app.use(bodyParser());

// Rutas
app.use(tasksRouter.routes());
app.use(tasksRouter.allowedMethods());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Database: ${process.env.DATABASE_URL ? "Connected" : "Check .env"}`
  );
});

