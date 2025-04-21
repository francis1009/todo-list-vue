<script setup lang="ts">
import TodoTable from "@/components/home/TodoTable.vue";
</script>

<template>
	<div class="hidden flex-1 flex-col space-y-8 p-8 md:flex">
		<div class="flex items-center justify-center space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Welcome!</h2>
				<p class="text-muted-foreground mb-8">
					Here is a list of all your tasks. You can add, edit, and delete tasks
					as needed.
				</p>
				<TodoTable />
			</div>
		</div>
	</div>
</template>
