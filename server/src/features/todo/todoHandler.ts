import type { Context } from "hono";
import { todoService } from "./todoService";
import { HTTPException } from "hono/http-exception";

export const todoHandler = {
	listTodos: async (c: Context) => {
		const db = c.get("db");
		if (!db) throw new HTTPException(500, { message: "DB connection error" });
		const todos = await todoService.getAllTodos(db);
		return c.json(todos);
	},

	createTodo: async (c: Context) => {
		const db = c.get("db");
		if (!db) throw new HTTPException(500, { message: "DB connection error" });

		try {
			const body = await c.req.json();
			const newTodo = await todoService.createTodo(body, db);
			return c.json(newTodo, 201);
		} catch (error: any) {
			throw new HTTPException(400, {
				message: error.message || "Failed to create todo",
			});
		}
	},

	updateTodo: async (c: Context) => {
		const id = Number(c.req.param("id"));
		const db = c.get("db");
		if (!db) throw new HTTPException(500, { message: "DB connection error" });

		try {
			const body = await c.req.json();
			const updatedTodo = await todoService.updateTodo(id, body, db);
			if (!updatedTodo) {
				throw new HTTPException(404, { message: "Todo not found for update" });
			}
			return c.json(updatedTodo);
		} catch (error: any) {
			throw new HTTPException(400, {
				message: error.message || "Failed to update todo",
			});
		}
	},

	updateTodoStatus: async (c: Context) => {
		const id = Number(c.req.param("id"));
		const db = c.get("db");
		if (!db) throw new HTTPException(500, { message: "DB connection error" });

		try {
			const body = await c.req.json();
			const updatedTodo = await todoService.updateTodoStatus(id, body, db);
			if (!updatedTodo) {
				throw new HTTPException(404, { message: "Todo not found for update" });
			}
			return c.json(updatedTodo);
		} catch (error: any) {
			throw new HTTPException(400, {
				message: error.message || "Failed to update todo",
			});
		}
	},

	deleteTodos: async (c: Context) => {
		const db = c.get("db");
		if (!db) throw new HTTPException(500, { message: "DB connection error" });

		try {
			const body = await c.req.json();
			const success = await todoService.deleteTodos(body, db);
			if (!success) {
				throw new HTTPException(404, {
					message: "Todo not found for deletion",
				});
			}
			return c.body(null, 204);
		} catch (error: any) {
			throw new HTTPException(400, {
				message: error.message || "Failed to delete todo",
			});
		}
	},
};
