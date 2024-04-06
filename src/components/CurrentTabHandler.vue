<template>
  <div
    ref="$tabHandler"
    id="target-url-magic-id"
    class="invisible hidden"
  ></div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useActiveTabUrlStore } from "@/stores/active-tab.store";
import { useMutationObserver } from "@vueuse/core";

const $tabHandler = ref<HTMLDivElement | null>(null);

const { activeTabUrl } = toRefs(useActiveTabUrlStore());

useMutationObserver(
  $tabHandler,
  () => {
    if (!$tabHandler.value) return;
    activeTabUrl.value = ($tabHandler.value.dataset?.url as string) || "";
  },
  {
    attributes: true,
  }
);
</script>
