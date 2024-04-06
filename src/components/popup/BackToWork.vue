<template>
  <div
    class="bg-cyan-500 text-black h-screen w-screen flex items-center justify-center flex-col"
  >
    <div class="flex gap-x-[13px] items-center mb-5">
      <TriangleAlert :size="44" class="stroke-1" />
      <h2 class="text-3xl font-semibold">Back to work!</h2>
    </div>
    <div class="flex items-center gap-x-4">
      <Button @click="$emit('dispatchState', PopupAction.START_SESSION)"
        >START SESSION</Button
      >
      <Button
        @click="$emit('dispatchState', PopupAction.CLOSE)"
        variant="outline"
        >CLOSE</Button
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
