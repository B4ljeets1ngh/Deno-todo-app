import { Router } from "https://deno.land/x/oak/mod.ts";
import todoController from "./controllers/TodoController.ts";

const router = new Router();

router.get("/todos", todoController.getTodos)
  .get("/todo/:id", todoController.getTodo)
  .post("/todo", todoController.addTodo)
  .delete("/todo/:id", todoController.deleteTodo)
  .put("/todo/:id", todoController.updateTodo);
export default router;
