import type { Todo, CreateTodoBody, UpdateTodoBody } from "@/types/todo";
import { fetcher } from "@/util/fetcher";

export function useTodoAPI() {
	const getAll = async () => {
		const response = await fetcher("/todo/getAll", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json<Todo[]>();
	};

	const create = async (todo: CreateTodoBody) => {
		const response = await fetcher("/todo/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json<Todo>();
	};

	const update = async (id: string, todo: UpdateTodoBody) => {
		const response = await fetcher(`/todo/update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json<Todo>();
	};

	const updateStatus = async (id: string, status: string) => {
		const response = await fetcher(`/todo/update/${id}/status`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status }),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json<Todo>();
	};

	const remove = async (ids: string[]) => {
		const response = await fetcher(`/todo/delete`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ids }),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
	};

	return { getAll, create, update, updateStatus, remove };
}
