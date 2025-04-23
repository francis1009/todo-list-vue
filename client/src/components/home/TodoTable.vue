<script setup lang="ts">
import type {
	SortingState,
	ColumnFiltersState,
	VisibilityState,
} from "@tanstack/vue-table";
import type { Todo } from "@/types/todo";
import { ref, computed, onMounted } from "vue";
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

const data = ref<Todo[]>([]);
async function getData(): Promise<Todo[]> {
	// Fetch data from your API here.
	return [
		{
			id: "1",
			task: "Do one thing",
			status: "todo",
			priority: "high",
			createdAt: new Date(),
		},
		{
			id: "2",
			task: "Do another thing",
			status: "completed",
			priority: "medium",
			createdAt: new Date(),
		},
		{
			id: "3",
			task: "Do yet another thing",
			status: "todo",
			priority: "low",
			createdAt: new Date(),
		},
		{
			id: "4",
			task: "A very long task name that exceeds the width of the column and messes up the layout and then it goes to the next line and it is very annoying and I don't like it at all and I want to fix it but I don't know how to do it",
			status: "in-progress",
			priority: "high",
			createdAt: new Date(),
		},
		{
			id: "5",
			task: "Do something else",
			status: "todo",
			priority: "medium",
			createdAt: new Date(),
		},
		{
			id: "6",
			task: "Do yet another thing",
			status: "completed",
			priority: "low",
			createdAt: new Date(),
		},
		{
			id: "7",
			task: "Do something else",
			status: "todo",
			priority: "high",
			createdAt: new Date(),
		},
	];
}

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

onMounted(async () => {
	data.value = await getData();
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
