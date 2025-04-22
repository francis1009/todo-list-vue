import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ChevronsUpDown, MoreHorizontal } from "lucide-vue-next";

import type { Todo } from "@/types/todo";
import { statuses, priorities } from "@/types/fields";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
	},
	{
		id: "actions",
		enableHiding: false,
		cell: () => {
			return h(
				"div",
				{ class: "relative" },
				h(DropdownMenu, () => [
					h(DropdownMenuTrigger, { asChild: true }, () =>
						h(
							Button,
							{
								variant: "ghost",
								class: "h-8 w-8 p-0 data-[state=open]:bg-muted",
							},
							() => [
								h("span", { class: "sr-only" }, "Open menu"),
								h(MoreHorizontal, { class: "h-4 w-4" }),
							],
						),
					),
					h(DropdownMenuContent, { align: "end" }, () => [
						h(
							DropdownMenuItem,
							{
								/* Add Edit Logic */
							},
							"Edit Task",
						),
						h(
							DropdownMenuItem,
							{ class: "text-red-600" /* Add Delete Logic */ },
							"Delete Task",
						),
					]),
				]),
			);
		},
	},
];
