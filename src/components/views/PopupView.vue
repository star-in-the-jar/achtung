<template>
  <LostFocus
    v-if="state === 'lost-focus'"
    @dispatch-state="handleDispatchState"
    :title="title"
  />
  <SessionCompleted
    v-else-if="state === 'session-completed'"
    @dispatch-state="handleDispatchState"
    :title="title"
  />
  <BackToWork
    v-else-if="state === 'back-to-work'"
    @dispatch-state="handleDispatchState"
    :title="title"
  />
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import LostFocus from "@/components/popup/LostFocus.vue";
import SessionCompleted from "@/components/popup/SessionCompleted.vue";
import BackToWork from "@/components/popup/BackToWork.vue";

const route = useRoute();

type PopupState = "lost-focus" | "session-completed" | "back-to-work";

const state = (route.query["state"] as PopupState) || "lost-focus";

const title = route.query["title"] as string | undefined;

const handleDispatchState = (popupState: PopupState) => {
  if (!window.opener) return;

  window.opener.postMessage(popupState, "*");
};
</script>
