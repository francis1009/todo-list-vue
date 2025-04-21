<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<div id="app-layout">
		<main>
			<div class="min-h-screen pb-24 flex flex-1 items-center justify-center">
				<RouterView />
			</div>
		</main>
	</div>
</template>
