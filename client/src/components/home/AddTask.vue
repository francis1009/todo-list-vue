<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
</script>

<template>
	<Dialog>
		<DialogTrigger>
			<Button>
				<Plus class="mr-2 h-4 w-4" />
				New Task</Button
			>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Add new task</DialogTitle>
				<DialogDescription>
					Add new tasks here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter><Button type="submit">Add</Button></DialogFooter>
		</DialogContent>
	</Dialog>
</template>
