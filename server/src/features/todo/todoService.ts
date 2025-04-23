import type { Kysely } from "kysely";
import type { Database } from "@/types/db";
import type {
	CreateTodoBody,
	UpdateTodoBody,
	DeleteTodosBody,
} from "@/types/todo";

export const todoService = {
	getAllTodos: async (db: Kysely<Database>) => {
		console.log(db);
		return await db
			.selectFrom("todo")
			.selectAll()
			.orderBy("id", "asc")
			.execute();
	},

	createTodo: async (body: CreateTodoBody, db: Kysely<Database>) => {
		return await db
			.insertInto("todo")
			.values({
				task: body.task,
				priority: body.priority || "medium", // Default priority
				status: "todo",
				updated_at: new Date().toISOString(),
			})
			.returningAll()
			.executeTakeFirstOrThrow();
	},

	updateTodo: async (
		id: number,
		body: UpdateTodoBody,
		db: Kysely<Database>,
	) => {
		const result = await db
			.updateTable("todo")
			.set({
				task: body.task,
				priority: body.priority,
				updated_at: new Date().toISOString(),
			})
			.where("id", "=", id)
			.returningAll()
			.executeTakeFirst();
		return result;
	},

	updateTodoStatus: async (
		id: number,
		body: { status: string },
		db: Kysely<Database>,
	) => {
		const result = await db
			.updateTable("todo")
			.set({
				status: body.status,
				updated_at: new Date().toISOString(),
			})
			.where("id", "=", id)
			.returningAll()
			.executeTakeFirst();
		return result;
	},

	deleteTodos: async (
		body: DeleteTodosBody,
		db: Kysely<Database>,
	): Promise<boolean> => {
		if (!body.ids || body.ids.length === 0) {
			throw new Error("No IDs provided for deletion");
		}

		const result = await db
			.deleteFrom("todo")
			.where("id", "in", body.ids)
			.executeTakeFirst();
		const success = Number(result?.numDeletedRows ?? 0) > 0;
		return success;
	},
};
