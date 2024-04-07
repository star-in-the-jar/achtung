<template>
  <div
    class="bg-amber-400 text-black h-screen w-screen flex items-center justify-center flex-col"
  >
    <div class="flex gap-x-[13px] items-center mb-5">
      <TriangleAlert :size="44" class="stroke-1" />
      <h2 class="text-3xl font-semibold">
        {{ title || "You’re losing focus!" }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TriangleAlert } from "lucide-vue-next";

defineEmits(["dispatchState"]);

defineProps<{
  title?: string;
}>();
</script>
