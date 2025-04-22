<script setup lang="ts" generic="TData">
import { computed } from "vue";
import type { Table } from "@tanstack/vue-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-vue-next";
import { statuses, priorities } from "@/types/fields";
import PopoverFilter from "@/components/home/PopoverFilter.vue";

interface TableFiltersProps {
	table: Table<TData>;
}
const props = defineProps<TableFiltersProps>();

const isFiltered = computed(() => {
	return props.table.getState().columnFilters.length > 0;
});
</script>

<template>
	<div class="flex items-center justify-between">
		<div class="flex flex-1 items-center space-x-2">
			<Input
				placeholder="Filter tasks..."
				:model-value="
					(table.getColumn('task')?.getFilterValue() as string) ?? ''
				"
				class="h-8 w-[150px] lg:w-[250px]"
				@input="table.getColumn('task')?.setFilterValue($event.target.value)"
			/>

			<PopoverFilter
				v-if="table.getColumn('status')"
				:column="table.getColumn('status')"
				title="Status"
				:options="statuses"
			/>

			<PopoverFilter
				v-if="table.getColumn('priority')"
				:column="table.getColumn('priority')"
				title="Priority"
				:options="priorities"
			/>

			<Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3"
				@click="table.resetColumnFilters()"
			>
				Reset
				<X class="ml-2 h-4 w-4" />
			</Button>
		</div>
	</div>
</template>
