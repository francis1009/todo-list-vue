export type priority = "low" | "medium" | "high";
export type status = "todo" | "in-progress" | "completed" | "cancelled";

export interface Todo {
	id: string;
	task: string;
	status: status;
	priority: priority;
	createdAt: Date;
}

export interface CreateTodoBody {
	task: string;
	priority?: priority;
}

export interface UpdateTodoBody {
	task?: string;
	priority?: priority;
}
