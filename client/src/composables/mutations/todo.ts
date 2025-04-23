import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Todo, CreateTodoBody, UpdateTodoBody } from "@/types/todo";
import { useTodoAPI } from "@/composables/api/todo";

export const useTodoMutations = () => {
	const queryClient = useQueryClient();
	const { create, update, remove } = useTodoAPI();

	const createTodo = useMutation({
		mutationFn: (todo: CreateTodoBody) => create(todo),
		onSuccess: (data) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
				if (!oldData) return [data];
				return [...oldData, data];
			});
		},
	});

	const updateTodo = useMutation({
		mutationFn: ({ id, todo }: { id: string; todo: UpdateTodoBody }) =>
			update(id, todo),
		onSuccess: (data) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
				if (!oldData) return [data];
				return oldData.map((todo) => (todo.id === data.id ? data : todo));
			});
		},
	});

	const deleteTodo = useMutation({
		mutationFn: (ids: string[]) => remove(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["todos"],
			});
		},
	});

	return { createTodo, updateTodo, deleteTodo };
};
