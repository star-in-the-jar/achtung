<template>
  <div
    ref="$tabHandler"
    id="target-url-magic-id"
    class="invisible hidden"
  ></div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useMutationObserver } from "@vueuse/core";

const $tabHandler = ref<HTMLDivElement | null>(null);
</script>
