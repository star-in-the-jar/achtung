<template>
  <div
    class="bg-amber-400 text-black h-screen w-screen flex items-center justify-center flex-col"
  >
    <div class="flex gap-x-[13px] items-center mb-5">
      <HammerIcon :size="44" class="stroke-1" />
      <h2 class="text-3xl font-semibold">You’re losing focus!</h2>
    </div>
    <div class="flex items-center gap-x-4">
      <Button @click="$emit('dispatchState', PopupAction.TAKE_A_BREAK)"
        >TAKE A BREAK</Button
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
import { HammerIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { PopupAction } from "@/enums/popup-state.enum";

defineEmits(["dispatchState"]);
</script>
