<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-vue-next";
import type { Todo, status } from "@/types/todo";
import { statuses } from "@/types/fields";
import EditTask from "@/components/home/EditTask.vue";
import { toast } from "vue-sonner";
import { useTodoMutate } from "@/composables/mutations/todo";

const props = defineProps<{
	todo: Todo;
}>();

const isEditDialogOpen = ref(false);
const openEditDialog = () => {
	isEditDialogOpen.value = true;
};
const selectedStatus = ref<status>(props.todo.status);

const { updateTodoStatusMutation } = useTodoMutate();

watch(selectedStatus, async (newStatus, oldStatus) => {
	if (newStatus && newStatus !== oldStatus && newStatus !== props.todo.status) {
		try {
			await updateTodoStatusMutation.mutateAsync({
				id: props.todo.id,
				status: newStatus,
			});
			toast.success("Status has been updated successfully!");
		} catch {
			toast.error("Failed to update status.");
		}
	}
});
</script>

<template>
	<div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					class="h-8 w-8 p-0 data-[state=open]:bg-muted"
					aria-label="Actions"
				>
					<span class="sr-only">Open menu</span>
					<MoreHorizontal class="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					@click="openEditDialog"
					:hidden="todo.status === 'completed'"
					>Edit Task</DropdownMenuItem
				>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup v-model="selectedStatus">
							<DropdownMenuRadioItem
								v-for="status in statuses"
								:key="status.value"
								:value="status.value"
								class="p-2"
								:hidden="status.value === todo.status"
							>
								{{ status.label }}
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
		<EditTask
			v-if="isEditDialogOpen"
			v-model:open="isEditDialogOpen"
			:todo="todo"
		/>
	</div>
</template>
