<script setup lang="ts" generic="TData">
import { computed, type Component } from "vue";
import type { Column } from "@tanstack/vue-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Check } from "lucide-vue-next";

interface PopoverFilterProps {
	column?: Column<TData, any>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: Component;
	}[];
}
const props = defineProps<PopoverFilterProps>();

const facets = props.column?.getFacetedUniqueValues();
const selectedValues = computed(
	() => new Set(props.column?.getFilterValue() as string[]),
);
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button variant="outline" size="sm" class="h-8 border-dashed">
				<CirclePlus class="mr-2 h-4 w-4" />
				{{ title }}
				<template v-if="selectedValues.size > 0">
					<Separator orientation="vertical" class="mx-2 h-4" />
					<Badge
						variant="secondary"
						class="rounded-sm px-1 font-normal lg:hidden"
					>
						{{ selectedValues.size }}
					</Badge>
					<div class="hidden space-x-1 lg:flex">
						<Badge
							v-if="selectedValues.size > 2"
							variant="secondary"
							class="rounded-sm px-1 font-normal"
						>
							{{ selectedValues.size }} selected
						</Badge>

						<template v-else>
							<Badge
								v-for="option in options.filter((option: any) =>
									selectedValues.has(option.value),
								)"
								:key="option.value"
								variant="secondary"
								class="rounded-sm px-1 font-normal"
							>
								{{ option.label }}
							</Badge>
						</template>
					</div>
				</template>
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-[200px] p-0" align="start">
			<Command>
				<CommandInput :placeholder="title" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup>
						<CommandItem
							v-for="option in options"
							:key="option.value"
							:value="option"
							@select="
								(e: any) => {
									console.log(e.detail.value);
									const isSelected = selectedValues.has(option.value);
									if (isSelected) {
										selectedValues.delete(option.value);
									} else {
										selectedValues.add(option.value);
									}
									const filterValues = Array.from(selectedValues);
									column?.setFilterValue(
										filterValues.length ? filterValues : undefined,
									);
								}
							"
						>
							<div
								:class="
									cn(
										'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
										selectedValues.has(option.value)
											? 'bg-primary text-primary-foreground'
											: 'opacity-50 [&_svg]:invisible',
									)
								"
							>
								<Check :class="cn('h-4 w-4')" />
							</div>
							<component
								:is="option.icon"
								v-if="option.icon"
								class="mr-2 h-4 w-4 text-muted-foreground"
							/>
							<span>{{ option.label }}</span>
							<span
								v-if="facets?.get(option.value)"
								class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
							>
								{{ facets.get(option.value) }}
							</span>
						</CommandItem>
					</CommandGroup>

					<template v-if="selectedValues.size > 0">
						<CommandSeparator />
						<CommandGroup>
							<CommandItem
								:value="{ label: 'Clear filters' }"
								class="justify-center text-center"
								@select="column?.setFilterValue(undefined)"
							>
								Clear filters
							</CommandItem>
						</CommandGroup>
					</template>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>
