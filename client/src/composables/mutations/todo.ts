import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Todo, CreateTodoBody, UpdateTodoBody } from "@/types/todo";
import { useTodoAPI } from "@/composables/api/todo";

export const useTodoMutate = () => {
	const queryClient = useQueryClient();
	const { create, update, updateStatus, remove } = useTodoAPI();

	const createTodoMutation = useMutation({
		mutationFn: (todo: CreateTodoBody) => create(todo),
		onSuccess: (data) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
				if (!oldData) return [data];
				return [...oldData, data];
			});
		},
	});

	const updateTodoMutation = useMutation({
		mutationFn: ({ id, todo }: { id: string; todo: UpdateTodoBody }) =>
			update(id, todo),
		onSuccess: (data) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
				if (!oldData) return [data];
				return oldData.map((todo) => (todo.id === data.id ? data : todo));
			});
		},
	});

	const updateTodoStatusMutation = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) =>
			updateStatus(id, status),
		onSuccess: (data) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
				if (!oldData) return [data];
				return oldData.map((todo) => (todo.id === data.id ? data : todo));
			});
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: (ids: string[]) => remove(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["todos"],
			});
		},
	});

	return {
		createTodoMutation,
		updateTodoMutation,
		updateTodoStatusMutation,
		deleteTodoMutation,
	};
};
