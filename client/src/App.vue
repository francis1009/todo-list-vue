<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<div id="app-layout">
		<main>
			<div class="min-h-screen py-24 flex flex-1">
				<RouterView />
			</div>
		</main>
	</div>
</template>
