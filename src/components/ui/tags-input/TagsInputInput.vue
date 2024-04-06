<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
  TagsInputInput,
  type TagsInputInputProps,
  useForwardProps,
} from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  TagsInputInputProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputInput
    v-bind="forwardedProps"
    :class="
      cn(
        'text-sm min-h-6 focus:outline-none flex-1 bg-transparent px-1 placeholder:text-slate-900/75 group-hover:placeholder:text-slate-900/90 focus:placeholder:text-slate-900/90 placeholder:transition-colors',
        props.class
      )
    "
  />
</template>
