<script setup lang="ts">
import { ref } from "vue";
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
import type { Todo } from "@/types/todo";
import { statuses } from "@/types/fields";
import EditTask from "@/components/home/EditTask.vue";
import { toast } from "vue-sonner";

defineProps<{
	todo: Todo;
}>();

const isEditDialogOpen = ref(false);
const openEditDialog = () => {
	isEditDialogOpen.value = true;
};
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
						<DropdownMenuRadioGroup :value="todo.status">
							<DropdownMenuRadioItem
								v-for="status in statuses"
								:key="status.value"
								:value="status.value"
								class="p-2"
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
