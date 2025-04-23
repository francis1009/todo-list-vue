export interface CreateTodoBody {
	task: string;
	priority?: "low" | "medium" | "high";
}

export interface UpdateTodoBody {
	task?: string;
	priority?: "low" | "medium" | "high";
}

export interface DeleteTodosBody {
	ids: number[];
}
