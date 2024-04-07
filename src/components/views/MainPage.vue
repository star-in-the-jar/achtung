<template>
  <div class="page-wrapper">
    <div class="content">
      <h2
        :class="[
          sessionState === SessionState.WORK ? 'opacity-100' : 'opacity-0',
        ]"
        class="text-9xl mb-[1.875rem] transition-opacity"
      >
        22:14
      </h2>
      <h1 class="text-5xl mb-[1.875rem] font-extrabold uppercase">
        {{ sessionHeadings[sessionState] }}
      </h1>
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
        mode="out-in"
      >
        <button
          class="inline-block mb-[1.875rem] transition-colors bg-white/50 hover:bg-white rounded-full"
          @click="handleStartTimerClick"
          v-if="sessionState === SessionState.STOPPED"
          key="stopped-action-section"
        >
          <CirclePlay :size="64" class="stroke-1 stroke-slate-900" />
        </button>
        <div
          class="inline-flex items-center gap-x-[10px] transition-opacity mb-[1.875rem]"
          v-else
          key="not-stopped-action-section"
        >
          <button
            @click="handleStopTimerClick"
            class="transition-colors bg-white/50 hover:bg-white rounded-full"
          >
            <CircleStop :size="64" class="stroke-1 stroke-slate-900" />
          </button>
          <button
            v-if="sessionState === SessionState.WORK"
            @click="handlePauseTimerClick"
            class="transition-colors bg-white/50 hover:bg-white rounded-full"
          >
            <CirclePause :size="64" class="stroke-1 stroke-slate-900" />
          </button>
          <button
            v-else
            @click="handleStartTimerClick"
            class="transition-colors bg-white/50 hover:bg-white rounded-full"
          >
            <CirclePlay :size="64" class="stroke-1 stroke-slate-900" />
          </button>
          <button
            @click="handleFastForwardTimerClick"
            class="transition-colors bg-white/50 hover:bg-white rounded-full"
          >
            <CircleFastForward class="stroke-slate-900" />
          </button>
        </div>
      </Transition>
      <div
        class="grid max-w-[800px] grid-cols-4 items-center gap-x-[2.1875rem] transition-opacity mb-[3.625rem]"
        :class="
          sessionState !== SessionState.WORK ? 'opacity-100' : 'opacity-0'
        "
      >
        <ReadySelect
          :options="workOptions"
          placeholder="Work time"
          v-model="timerOptions.workTime"
        />

        <ReadySelect
          :options="breakOptions"
          placeholder="Break time"
          v-model="timerOptions.breakTime"
        />

        <ReadySelect
          :options="cycleOptions"
          placeholder="Amount of cycles"
          v-model="timerOptions.cycles"
        />

        <ReadySelect
          :options="focusGoal"
          placeholder="Focus goal"
          v-model="timerOptions.focusGoal"
        />
      </div>
      <ReadyTagsInput
        v-model="bannedPages"
        placeholder="Pages to ban"
        class="max-w-[800px] w-full mb-10"
        :class="
          sessionState !== SessionState.WORK ? 'opacity-100' : 'opacity-0'
        "
      />
      <AutoComplete
        :options="currentApps"
        v-model="bannedApps"
        class="max-w-[800px] w-full"
        placeholder="Apps to ban"
        :class="
          sessionState !== SessionState.WORK ? 'opacity-100' : 'opacity-0'
        "
      />
    </div>

    <div
      class="fixed inline-flex flex-col right-[1.5625rem] top-[1.5625rem] gap-y-[0.8125rem]"
    >
      <RouterLink to="/settings">
        <Settings :size="36" class="stroke-slate-900" />
      </RouterLink>
      <RouterLink to="/statistics/relative-spent-time" @click="">
        <BarChart3 :size="36" class="stroke-slate-900" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import CircleFastForward from "@/components/icons/CircleFastForward.vue";
import {
  CirclePlay,
  CircleStop,
  CirclePause,
  Settings,
  BarChart3,
} from "lucide-vue-next";
import { ReadySelect } from "@/components/ui/select";
import { ReadyTagsInput } from "@/components/ui/tags-input";
import { AutoComplete } from "@/components/ui/auto-complete";
import { SessionState } from "@/types";

const workOptions = [
  { label: "25 minutes work", value: "25m" },
  { label: "30 minutes work", value: "30m" },
  { label: "35 minutes work", value: "35m" },
  { label: "40 minutes work", value: "40m" },
  { label: "45 minutes work", value: "45m" },
  { label: "50 minutes work", value: "50m" },
  { label: "55 minutes work", value: "55m" },
  { label: "60 minutes work", value: "60m" },
];

const breakOptions = [
  { label: "5 minutes break", value: "5m" },
  { label: "10 minutes break", value: "10m" },
  { label: "15 minutes break", value: "15m" },
  { label: "20 minutes break", value: "20m" },
  { label: "25 minutes break", value: "25m" },
  { label: "30 minutes break", value: "30m" },
];

const cycleOptions = [
  { label: "1 cycle", value: "1" },
  { label: "2 cycles", value: "2" },
  { label: "3 cycles", value: "3" },
  { label: "4 cycles", value: "4" },
  { label: "5 cycles", value: "5" },
  { label: "6 cycles", value: "6" },
  { label: "7 cycles", value: "7" },
  { label: "8 cycles", value: "8" },
];

const focusGoal = [
  { label: "80% focus goal", value: "0.8" },
  { label: "85% focus goal", value: "0.85" },
  { label: "90% focus goal", value: "0.9" },
  { label: "95% focus goal", value: "0.95" },
  { label: "100% focus goal", value: "1" },
];

const timerOptions = reactive({
  workTime: "",
  breakTime: "",
  cycles: "",
  focusGoal: "",
});

const currentApps = [
  { label: "Google Chrome", value: "google-chrome" },
  { label: "Visual Studio Code", value: "visual-studio-code" },
  { label: "Slack", value: "slack" },
  { label: "Discord", value: "discord" },
  { label: "Spotify", value: "spotify" },
  { label: "Notion", value: "notion" },
  { label: "Microsoft Teams", value: "microsoft-teams" },
  { label: "Zoom", value: "zoom" },
  { label: "Microsoft Edge", value: "microsoft-edge" },
  { label: "Firefox", value: "firefox" },
];

const bannedPages = ref<string[]>([]);
const bannedApps = ref<string[]>([]);

// AKTUALNIE ZBANOWANE APLIKACJE
const detailedBannedAps = computed(() => {
  return currentApps.filter((app) => bannedApps.value.includes(app.label));
});

const sessionState = ref<SessionState>(SessionState.STOPPED);

const handleStartTimerClick = () => {
  // dostajesz taki przykładowy timerOptions
  //  {
  //     "workTime": "30m",
  //     "breakTime": "10m",
  //     "cycles": "3",
  //     "focusGoal": "0.95"
  // }

  sessionState.value = SessionState.WORK;
};

const handlePauseTimerClick = () => {
  sessionState.value = SessionState.PAUSED;
};

const handleStopTimerClick = () => {
  sessionState.value = SessionState.STOPPED;
};

const handleFastForwardTimerClick = () => {
  // STACHU DODAJ TU KOD NA FAST FORWARD
};

const sessionHeadings = {
  [SessionState.WORK]: "Focus time",
  [SessionState.PAUSED]: "Paused",
  [SessionState.BREAK]: "Break time",
  [SessionState.STOPPED]: "Start session",
};
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> 2861cdd (Merge landing changes.)
