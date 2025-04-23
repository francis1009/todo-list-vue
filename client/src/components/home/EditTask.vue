<script setup lang="ts">
import { ref, computed } from "vue";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { Todo, priority, UpdateTodoBody } from "@/types/todo";
import { useTodoMutate } from "@/composables/mutations/todo";
import { toast } from "vue-sonner";

const props = defineProps<{ todo: Todo; open: boolean }>();

const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
}>();
const openDialog = computed({
	get: () => props.open,
	set: (value: boolean) => emit("update:open", value),
});

const taskInput = ref("");
const priorityInput = ref<priority>("low");
const { updateTodoMutation } = useTodoMutate();

const updateTodo = async () => {
	if (!taskInput.value.trim()) {
		toast.error("Please enter a task.");
		return;
	}

	const updatedTodo: UpdateTodoBody = {
		task: taskInput.value,
		priority: priorityInput.value,
	};
	try {
		await updateTodoMutation.mutateAsync({
			id: props.todo.id,
			todo: updatedTodo,
		});
		toast.success("Task has been updated successfully!");
		taskInput.value = "";
		priorityInput.value = "low";
		openDialog.value = false;
	} catch (error) {
		console.error("Error adding new task:", error);
	}
};
</script>

<template>
	<Dialog :open="openDialog" @update:open="openDialog = $event">
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit task</DialogTitle>
				<DialogDescription>
					Make changes to your tasks here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-6 items-center gap-4">
					<Label for="task" class="text-right"> Task </Label>
					<Textarea id="task" class="col-span-5" v-model="taskInput" />
				</div>
				<div class="grid grid-cols-6 items-center gap-4">
					<Label for="username" class="text-right"> Priority </Label>
					<RadioGroup
						default-value="low"
						id="priority"
						v-model="priorityInput"
						class="flex items-center gap-4"
					>
						<div class="flex items-center space-x-2">
							<RadioGroupItem id="low" value="low" />
							<Label for="low">Low</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroupItem id="medium" value="medium" />
							<Label for="medium">Medium</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroupItem id="high" value="high" />
							<Label for="high">High</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<DialogFooter
				><Button @click="updateTodo">Save changes</Button></DialogFooter
			>
		</DialogContent>
	</Dialog>
</template>
