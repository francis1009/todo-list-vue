<script setup lang="ts">
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-vue-next";
import { computed } from "vue";
import { toast } from "vue-sonner";

type TodoTableExposed = {
	getNumberOfSelectedRows: () => number;
	deleteSelectedRows: () => void;
	hasSelectedRows: boolean;
};

const props = defineProps<{
	todoTableRef: TodoTableExposed | null;
}>();

const canDelete = computed(() => {
	return !!props.todoTableRef?.hasSelectedRows;
});

const deleteSelectedTodos = () => {
	if (!props.todoTableRef) {
		toast.error("Table reference not available");
		return;
	}
	if (!props.todoTableRef.hasSelectedRows) {
		toast.warning("Please select at least one task to delete.");
		return;
	}
	props.todoTableRef.deleteSelectedRows();
	toast.success("Selected tasks have been deleted.");
};
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger as-child>
			<Button
				:disabled="!canDelete"
				class="bg-destructive hover:bg-destructive/90 text-white"
			>
				<Trash2 class="mr-2 h-4 w-4" />
				Delete
				{{
					todoTableRef?.hasSelectedRows
						? todoTableRef.getNumberOfSelectedRows()
						: 0
				}}
				selected
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your task.
					If you want to keep it, please update the status as cancelled instead.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction @click="deleteSelectedTodos"
					>Continue</AlertDialogAction
				>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
