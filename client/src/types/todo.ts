export interface Todo {
	id: string;
	task: string;
	status: "todo" | "in-progress" | "completed" | "cancelled";
	priority: "low" | "medium" | "high";
	createdAt: Date;
}
