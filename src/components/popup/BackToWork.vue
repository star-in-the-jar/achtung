<template>
  <div
    class="bg-cyan-500 text-black h-screen w-screen flex items-center justify-center flex-col"
  >
    <div class="flex gap-x-[13px] items-center mb-5">
      <HammerIcon :size="44" class="stroke-1" />
      <h2 class="text-3xl font-semibold">{{ title || "Back to work!" }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HammerIcon } from "lucide-vue-next";

defineEmits(["dispatchState"]);

defineProps<{
  title?: string;
}>();
</script>
