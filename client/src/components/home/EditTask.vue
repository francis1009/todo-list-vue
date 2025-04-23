<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
</script>

<template>
	<Dialog>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit task</DialogTitle>
				<DialogDescription>
					Make changes to your tasks here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter><Button type="submit"> Save changes </Button></DialogFooter>
		</DialogContent>
	</Dialog>
</template>
