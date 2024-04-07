<template>
  <h1 class="text-2xl">{{ readableTimeLeft }}</h1>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useGlobalStore } from "@/stores/global.store";

const { global } = toRefs(useGlobalStore());

const readableTimeLeft = computed(() => {
  const timeLeft = global.value.state?.timeLeft;
  if (!timeLeft) return "00:00";
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor(timeLeft / 1000) % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});
</script>
