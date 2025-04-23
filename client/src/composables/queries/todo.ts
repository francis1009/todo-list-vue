import { useQuery } from "@tanstack/vue-query";
import type { Todo } from "@/types/todo";
import { useTodoAPI } from "@/composables/api/todo";

const { getAll } = useTodoAPI();

export const useTodoQuery = () => {
	function getTodos() {
		const { data, isFetched } = useQuery<Todo[], Error>({
			queryKey: ["todos"],
			queryFn: () => getAll(),
		});
		return {
			data,
			isFetched,
		};
	}

	return {
		getTodos,
	};
};
