import { Hono } from "hono";
import { todoHandler } from "./todoHandler";

const todoRouter = new Hono();

// GET /todo/getAll - List all todos
todoRouter.get("/getAll", todoHandler.listTodos);

// POST /todo/create - Create a new todo
todoRouter.post("/create", todoHandler.createTodo);

// PUT /todo/update/:id - Update a todo by ID
todoRouter.put("/update/:id", todoHandler.updateTodo);

// DELETE /todo/delete - Delete todos by IDs
todoRouter.delete("/delete", todoHandler.deleteTodos);

export default todoRouter;
