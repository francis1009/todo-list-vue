<script setup lang="ts">
import type {
	SortingState,
	ColumnFiltersState,
	VisibilityState,
} from "@tanstack/vue-table";
import type { Todo } from "@/types/todo";
import { ref, computed, watchEffect } from "vue";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	FlexRender,
	useVueTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
} from "@tanstack/vue-table";
import { valueUpdater } from "@/lib/utils";
import { columns } from "@/components/home/columns";
import TableFilters from "@/components/home/TableFilters.vue";
import TablePagination from "@/components/home/TablePagination.vue";
import { useTodoQuery } from "@/composables/queries/todo";

const data = ref<Todo[]>([]);
const { getTodos } = useTodoQuery();
const { data: queryData } = getTodos();

watchEffect(() => {
	if (queryData.value) {
		data.value = [...queryData.value];
	}
});

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const table = useVueTable({
	get data() {
		return data;
	},
	get columns() {
		return columns;
	},
	getCoreRowModel: getCoreRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: (updaterOrValue) =>
		valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: (updaterOrValue) =>
		valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: (updaterOrValue) =>
		valueUpdater(updaterOrValue, rowSelection),
	state: {
		get sorting() {
			return sorting.value;
		},
		get rowSelection() {
			return rowSelection.value;
		},
		get columnFilters() {
			return columnFilters.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
	},
});

defineExpose({
	getNumberOfSelectedRows: (): number => {
		return table.getSelectedRowModel().rows.length;
	},
	deleteSelectedRows: () => {
		const selectedIds = table
			.getSelectedRowModel()
			.rows.map((row) => row.original.id);
		data.value = data.value.filter((todo) => !selectedIds.includes(todo.id));
		table.resetRowSelection();
	},
	hasSelectedRows: computed(() => {
		return table.getSelectedRowModel().rows.length > 0;
	}),
});
</script>

<template>
	<div class="space-y-4">
		<TableFilters :table="table" />
		<div class="border rounded-md">
			<Table>
				<TableHeader>
					<TableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<TableHead v-for="header in headerGroup.headers" :key="header.id">
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="table.getRowModel().rows?.length">
						<TableRow
							v-for="row in table.getRowModel().rows"
							:key="row.id"
							:data-state="row.getIsSelected() ? 'selected' : undefined"
						>
							<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
								<FlexRender
									:render="cell.column.columnDef.cell"
									:props="cell.getContext()"
								/>
							</TableCell>
						</TableRow>
					</template>
					<template v-else>
						<TableRow>
							<TableCell :colspan="columns.length" class="h-24 text-center">
								No tasks.
							</TableCell>
						</TableRow>
					</template>
				</TableBody>
			</Table>
		</div>
	</div>
	<TablePagination :table="table" class="mt-2" />
</template>
