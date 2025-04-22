<script setup lang="ts">
import type { Todo } from "@/types/todo";
import { onMounted, ref } from "vue";
import { columns } from "@/components/home/columns";
import TodoTable from "@/components/home/TodoTable.vue";

const data = ref<Todo[]>([]);

async function getData(): Promise<Todo[]> {
	// Fetch data from your API here.
	return [
		{
			id: "1",
			task: "Do one thing",
			status: "todo",
			priority: "high",
			createdAt: new Date(),
		},
		{
			id: "2",
			task: "Do another thing",
			status: "completed",
			priority: "medium",
			createdAt: new Date(),
		},
		{
			id: "3",
			task: "Do yet another thing",
			status: "todo",
			priority: "low",
			createdAt: new Date(),
		},
	];
}

onMounted(async () => {
	data.value = await getData();
});
</script>

<template>
	<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
		<div class="flex items-center justify-center space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Welcome!</h2>
				<p class="text-muted-foreground mb-8">
					Here is a list of all your tasks. You can add, edit, and delete tasks
					as needed.
				</p>
				<TodoTable :columns="columns" :data="data" />
			</div>
		</div>
	</div>
</template>
