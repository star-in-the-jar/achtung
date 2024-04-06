<template>
  <div
    class="bg-green-500 text-slate-900 h-screen w-screen flex items-center justify-center flex-col"
  >
    <div class="flex gap-x-[13px] items-center mb-5">
      <TriangleAlert :size="44" class="stroke-1" />
      <h2 class="text-3xl font-semibold">Session completed</h2>
    </div>
    <div class="flex items-center gap-x-4">
      <Button @click="$emit('dispatchState', PopupAction.START_BREAK)"
        >START BREAK</Button
      >
      <Button
        @click="$emit('dispatchState', PopupAction.SKIP)"
        variant="outline"
        >SKIP</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { TriangleAlert } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { PopupAction } from "@/enums/popup-state.enum";

defineEmits(["dispatchState"]);
</script>
