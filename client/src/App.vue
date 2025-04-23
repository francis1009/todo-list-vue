<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
	<Toaster richColors />
	<div id="app-layout">
		<main>
			<div class="min-h-screen py-24 flex flex-1">
				<RouterView />
			</div>
		</main>
	</div>
</template>
