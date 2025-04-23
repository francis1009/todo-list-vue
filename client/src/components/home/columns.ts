import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ChevronsUpDown } from "lucide-vue-next";
import type { Todo } from "@/types/todo";
import { statuses, priorities } from "@/types/fields";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ActionColumn from "@/components/home/ActionColumn.vue";

export const columns: ColumnDef<Todo>[] = [
	{
		id: "select",
		header: ({ table }) =>
			h(Checkbox, {
				modelValue:
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate"),
				"onUpdate:modelValue": (value: string | boolean) =>
					table.toggleAllPageRowsSelected(!!value),
				ariaLabel: "Select all",
			}),
		cell: ({ row }) =>
			h(Checkbox, {
				modelValue: row.getIsSelected(),
				"onUpdate:modelValue": (value: string | boolean) =>
					row.toggleSelected(!!value),
				ariaLabel: "Select row",
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => {
			return h(
				Button,
				{
					variant: "ghost",
					onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
				},
				() => ["ID", h(ChevronsUpDown, { class: "ml-2 h-4 w-4" })],
			);
		},
		cell: ({ row }) =>
			h("div", { class: "font-medium" }, `TASK-${row.getValue("id")}`),
		enableHiding: false,
	},
	{
		accessorKey: "task",
		header: ({ column }) => {
			return h(
				Button,
				{
					variant: "ghost",
					onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
				},
				() => ["Task", h(ChevronsUpDown, { class: "ml-2 h-4 w-4" })],
			);
		},
		cell: ({ row }) => h("div", { class: "text-wrap" }, row.getValue("task")),
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return h(
				Button,
				{
					variant: "ghost",
					onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
				},
				() => ["Status", h(ChevronsUpDown, { class: "ml-2 h-4 w-4" })],
			);
		},
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status"),
			);
			if (!status) return null;

			return h("div", { class: "flex w-[100px] items-center" }, [
				status.icon &&
					h(status.icon, { class: "mr-2 h-4 w-4 text-muted-background" }),
				h("span", { class: "capitalize" }, status.label),
			]);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "priority",
		header: ({ column }) => {
			return h(
				Button,
				{
					variant: "ghost",
					onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
				},
				() => ["Priority", h(ChevronsUpDown, { class: "ml-2 h-4 w-4" })],
			);
		},
		cell: ({ row }) => {
			const priority = priorities.find(
				(priority) => priority.value === row.getValue("priority"),
			);
			if (!priority) return null;

			return h("div", { class: "flex w-[100px] items-center" }, [
				priority.icon &&
					h(priority.icon, { class: "mr-2 h-4 w-4 text-muted-background" }),
				h("span", { class: "capitalize" }, priority.label),
			]);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const todo = row.original;
			return h("div", { class: "relative" }, h(ActionColumn, { todo }));
		},
	},
];
