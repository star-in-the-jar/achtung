import { defineStore } from "pinia";
import { GlobalStore, Session, SessionState} from "@/types";
import { ref } from "vue";

export const useGlobalStore = defineStore("global-store", () => {
  const global = ref<GlobalStore>({
    sessions: [{
      state: SessionState.STOPPED,
      config: {
        workDuration: 0,
        breakDuration: 0,
        cycleNumber: 0,
        focusGoal: 0,
        unwantedApps: [],
        unwantedWebsites: [],
      },
      timeLeft: 0,
      events: [],
    }],
    lastDetected: {
      isTired: false,
      isDistracted: false,
      isAsleep: false,
      isLookingAway: false,
      isPresent: true,
    },
    stateBeforePause:SessionState.STOPPED,
  });

  return {
    global,
  };
});
