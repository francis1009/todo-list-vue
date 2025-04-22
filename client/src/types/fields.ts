import { h } from "vue";
import {
	Circle,
	CircleCheck,
	CircleX,
	MoveDown,
	MoveRight,
	MoveUp,
    Timer,
} from "lucide-vue-next";

export const statuses = [
	{
		value: "todo",
		label: "Todo",
		icon: h(Circle),
	},
	{
		value: "in-progress",
		label: "In Progress",
		icon: h(Timer),
	},
	{
		value: "completed",
		label: "Completed",
		icon: h(CircleCheck),
	},
	{
		value: "cancelled",
		label: "Cancelled",
		icon: h(CircleX),
	},
];

export const priorities = [
	{
		value: "low",
		label: "Low",
		icon: h(MoveUp),
	},
	{
		value: "medium",
		label: "Medium",
		icon: h(MoveRight),
	},
	{
		value: "high",
		label: "High",
		icon: h(MoveDown),
	},
];
