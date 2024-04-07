<template>
  <div
    class="bg-green-500 text-slate-900 h-screen w-screen flex items-center justify-center flex-col"
  >
    <div class="flex gap-x-[13px] items-center mb-5">
      <CheckCircle :size="44" class="stroke-1" />
      <h2 class="text-3xl font-semibold">{{ title || "Session completed" }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle } from "lucide-vue-next";

defineEmits(["dispatchState"]);

defineProps<{
  title?: string;
}>();
</script>
