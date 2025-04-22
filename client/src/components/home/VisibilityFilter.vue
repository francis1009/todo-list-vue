<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import type { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { computed } from "vue";
import { Settings2 } from "lucide-vue-next";

interface VisibilityFilterProps {
	table: Table<Todo>;
}

const props = defineProps<VisibilityFilterProps>();

const columns = computed(() =>
	props.table
		.getAllColumns()
		.filter(
			(column) =>
				typeof column.accessorFn !== "undefined" && column.getCanHide(),
		),
);
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
				<Settings2 class="mr-2 h-4 w-4" />
				View
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-[150px]">
			<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuCheckboxItem
				v-for="column in columns"
				:key="column.id"
				class="capitalize"
				:modelValue="column.getIsVisible()"
				@update:modelValue="(value: any) => column.toggleVisibility(!!value)"
			>
				{{ column.id }}
			</DropdownMenuCheckboxItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
