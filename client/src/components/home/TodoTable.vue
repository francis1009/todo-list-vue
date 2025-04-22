<script setup lang="ts" generic="TData, TValue">
import type {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
} from "@tanstack/vue-table";
import { ref } from "vue";
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
} from "@tanstack/vue-table";
import { valueUpdater } from "@/lib/utils";
import TableFilters from "@/components/home/TableFilters.vue";

const props = defineProps<{
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const rowSelection = ref({});

const table = useVueTable({
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},
	getCoreRowModel: getCoreRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: (updaterOrValue) =>
		valueUpdater(updaterOrValue, columnFilters),
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
	},
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
								No results.
							</TableCell>
						</TableRow>
					</template>
				</TableBody>
			</Table>
		</div>
	</div>
</template>
