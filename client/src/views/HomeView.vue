<script setup lang="ts">
import { ref } from "vue";
import TodoTable from "@/components/home/TodoTable.vue";
import AddTask from "@/components/home/AddTask.vue";
import DeleteDialog from "@/components/home/DeleteDialog.vue";

type TodoTableExposed = {
	getNumberOfSelectedRows: () => number;
	deleteSelectedRows: () => void;
	hasSelectedRows: boolean;
};

const todoTableRef = ref<TodoTableExposed | null>(null);
</script>

<template>
	<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
		<div class="flex justify-center space-y-2">
			<div class="w-4/5">
				<div class="flex items-center justify-between space-x-4 mb-4">
					<div>
						<h2 class="text-2xl font-bold tracking-tight">Welcome!</h2>
						<p class="text-muted-foreground">
							Here is a list of all your tasks. You can add, edit, and delete
							tasks as needed.
						</p>
					</div>
					<div class="space-x-4">
						<DeleteDialog :todoTableRef="todoTableRef" />
						<AddTask />
					</div>
				</div>
				<TodoTable ref="todoTableRef" />
			</div>
		</div>
	</div>
</template>
