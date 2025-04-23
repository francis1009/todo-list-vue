export interface Todo {
	id: string;
	task: string;
	status: "todo" | "in-progress" | "completed" | "cancelled";
	priority: "low" | "medium" | "high";
	createdAt: Date;
}

export interface CreateTodoBody {
	task: string;
	priority?: "low" | "medium" | "high";
}

export interface UpdateTodoBody {
	task?: string;
	priority?: "low" | "medium" | "high";
}