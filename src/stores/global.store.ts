import { defineStore } from "pinia";
import { GlobalStore, SessionState, type FetchDataReturnType } from "@/types";
import { ref } from "vue";

const fetchData = async (): Promise<FetchDataReturnType> => {
  const isAsleep = await fetch("http://localhost:3000/asleep.json").then(
    (resp) => resp.json()
  );
  const isDistracted = await fetch(
    "http://localhost:3000/distracted.json"
  ).then((resp) => resp.json());
  const hasHead = await fetch("http://localhost:3000/has_head.json").then(
    (resp) => resp.json()
  );
  const isLookingAway = await fetch(
    "http://localhost:3000/looking_away.json"
  ).then((resp) => resp.json());
  const isTired = await fetch("http://localhost:3000/tired.json").then((resp) =>
    resp.json()
  );
  const windows = await fetch("http://localhost:3000/windows.json").then(
    (resp) => resp.json()
  );

  return {
    isAsleep,
    isDistracted,
    hasHead,
    isLookingAway,
    isTired,
    windows,
  };
};

const getTime = () => new Date().getTime();

const audio = document.createElement("audio")
audio.src = "http://localhost:3000/sound.mp3";
audio.loop = true
audio.load()

export const useGlobalStore = defineStore("global-store", () => {
  const global = ref<GlobalStore>({
    state: null,
    windowReference: null,
    lastDistractedTimeStamp: 0,
    lastDetected: {
      isTired: false,
      isDistracted: false,
      isAsleep: false,
      isLookingAway: false,
      hasHead: true,
      windows: {
        windows: [],
        focusedWindow: null,
      },
    },
  });

  const selectedTabUrl = ref("");
  setInterval(async () => {
    global.value.lastDetected = await fetchData();
  }, 250);

  setInterval(() => {
    if (!global.value.state) return;

    if (
      global.value.state?.state === SessionState.PAUSED ||
      global.value.state?.state === SessionState.STOPPED
    )
      return;

    const rawSelectedTabUrl = document.getElementById(
      "target-url-magic-id"
    )?.innerText;

    let isDistractedApp = false;
    if (global.value.lastDetected.windows.focusedWindow) {
      if (
        global.value.state.config?.unwantedApps.includes(
          global.value.lastDetected.windows.focusedWindow
        )
      ) {
        isDistractedApp = true;
      }
    }

    let isDistractedBrowser = false;
    if (rawSelectedTabUrl) {
      try {
        const parsedSelectedTabUrl = JSON.parse(rawSelectedTabUrl)?.url;
        if (parsedSelectedTabUrl) {
          const url = new URL(parsedSelectedTabUrl);
          if (
            global.value.state.config?.unwantedWebsites.includes(url.hostname)
          ) {
            isDistractedBrowser = true;
          }
        }
      } catch (e) { }
    }

    console.log(global.value.lastDetected)
    const isDistracted =
      global.value.lastDetected.isDistracted ||
      global.value.lastDetected.isTired ||
      global.value.lastDetected.isAsleep ||
      global.value.lastDetected.isLookingAway ||
      !global.value.lastDetected.hasHead ||
      isDistractedBrowser ||
      isDistractedApp;

    if (isDistracted && global.value.lastDistractedTimeStamp !== 0) {
      global.value.lastDistractedTimeStamp = getTime();
    }

    if (
      isDistracted &&
      getTime() - global.value.lastDistractedTimeStamp > 5000 &&
      global.value.state.state === SessionState.WORK
    ) {
      if (!global.value.windowReference) {
        const blockWidth = 600;
        const blockHeight = 300;

        const leftOffset = window.screen.width / 2 - blockWidth / 2;
        const topOffset = window.screen.height / 2 - blockHeight / 2;

        audio.play()
        global.value.windowReference = window.open(
          "/popup?state=lost-focus",
          "_blank",
          `width=${blockWidth},height=${blockHeight},popup=true,left=${leftOffset},top=${topOffset}`
        );
      }
    }

    if (
      (!isDistracted || global.value.state.state !== SessionState.WORK) &&
      global.value.windowReference
    ) {
      audio.pause()
      global.value.windowReference.close();
      global.value.windowReference = null;
    }

    if (global.value.state.timeLeft > 0) {
      global.value.state.timeLeft -= 1000;
    }

    if (global.value.state.timeLeft <= 0) {
      global.value.state.timeLeft = 0;

      if (global.value.state?.state === SessionState.WORK) {
        global.value.state.timeLeft =
          global.value.state.config?.breakDuration || 0;
        global.value.state.state = SessionState.BREAK;
      } else if (global.value.state?.state === SessionState.BREAK) {
        global.value.state.timeLeft =
          global.value.state.config?.workDuration || 0;
        global.value.state.state = SessionState.WORK;
        global.value.state.cycleNumber += 1;
      }
    }
  }, 1000);

  return {
    global,
    selectedTabUrl,
  };
});
