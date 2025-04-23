<script setup lang="ts">
import { ref } from "vue";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import { Plus } from "lucide-vue-next";
import { useTodoMutate } from "@/composables/mutations/todo";
import type { priority, CreateTodoBody } from "@/types/todo";

const taskInput = ref("");
const priorityInput = ref<priority>("low");
const isDialogOpen = ref(false);
const { createTodoMutation } = useTodoMutate();

const addNewTodo = async () => {
	if (!taskInput.value.trim()) {
		toast.error("Please enter a task.");
		return;
	}

	const newTodo: CreateTodoBody = {
		task: taskInput.value,
		priority: priorityInput.value,
	};
	try {
		await createTodoMutation.mutateAsync(newTodo);
		toast.success("New task added successfully!");
		taskInput.value = "";
		priorityInput.value = "low";
		isDialogOpen.value = false;
	} catch (error) {
		console.error("Error adding new task:", error);
	}
};

const handleDialogClose = (openState: boolean) => {
	if (!openState) {
		taskInput.value = "";
		priorityInput.value = "low";
	}
	isDialogOpen.value = openState;
};
</script>

<template>
	<Dialog :open="isDialogOpen" @update:open="handleDialogClose">
		<DialogTrigger as-child>
			<Button @click="isDialogOpen = true">
				<Plus class="mr-2 h-4 w-4" />
				New Task</Button
			>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Add new task</DialogTitle>
				<DialogDescription>
					Add new tasks here. Click save when you're done.
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
			<DialogFooter><Button @click="addNewTodo">Add</Button></DialogFooter>
		</DialogContent>
	</Dialog>
</template>
