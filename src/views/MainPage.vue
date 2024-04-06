<template>
  <div class="main-page">
    <div class="content">
      <h1 class="text-5xl" style="color: black; margin-bottom: 50px" v-if="!focusSessionStarted">
        START FOCUS SESSION
      </h1>
      <Timer />
<<<<<<< HEAD
      <div
        class="icon-container"
        @click="startFocusSession"
        v-if="!focusSessionStarted"
      >
=======
      <div class="icon-container" @click="startFocusSession" v-if="!focusSessionStarted">
>>>>>>> d506bc5 (Create store & detect distracted from input files.)
        <CirclePlay color="black" size="64" class="stroke-1" />
      </div>
      <div class="text-container" v-if="focusSessionStarted">
        <h1 class="focus-on text-5xl" style="color: black; margin-bottom: 50px">
          FOCUS ON
        </h1>
        <div class="timer">
          <h1 class="focus-on text-5xl" style="color: black; margin-bottom: 50px">
            {{ timer }}
          </h1>
          <button @click="startTimer">
            <CirclePlay color="black" size="64" class="stroke-1" />
          </button>
          <button @click="stopTimer">
            <CircleStop color="black" size="64" class="stroke-1" />
          </button>
          <button @click="resetTimer">
            <FastForward color="black" size="28" class="stroke-1" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup scoped lang="ts">
import { toRefs, ref, reactive } from "vue";
import { CirclePlay, CircleStop, FastForward } from "lucide-vue-next";
import { Select } from "@/components/ui/select";
import Timer from "@/components/Timer.vue";
import {
  DATA_FILE_NAMES,
  Session,
  Event,
  SessionState,
  detectedKeys,
  Detected,
} from "@/types";
import { useGlobalStore } from "@/stores/global.store";

const { global } = toRefs(useGlobalStore());

const DATA_CHECK_DEBOUNCE = 3000;

const data = reactive({
  focusSessionStarted: false,
  timerRunning: false,
  timer: "25:00",
  interval: null,
  remainingTime: 1500000,
});

const startFocusSession = () => {
  // this.focusSessionStarted = true;
  // this.startTimer();
};

const startTimer = () => {
  // if (!this.timerRunning) {
  //   this.interval = setInterval(() => {
  //     if (this.remainingTime === 0) {
  //       clearInterval(this.interval);
  //       this.timerRunning = false;
  //       return;
  //     }
  //     this.remainingTime -= 1000;
  //     const minutes = Math.floor(this.remainingTime / 60000);
  //     const seconds = ((this.remainingTime % 60000) / 1000).toFixed(0);
  //     this.timer = `${minutes.toString().padStart(2, "0")}:${seconds
  //       .toString()
  //       .padStart(2, "0")}`;
  //   }, 1000);
  //   this.timerRunning = true;
  // }
};

const stopTimer = () => {
  // clearInterval(this.interval);
  // this.timerRunning = false;
};

const resetTimer = () => {
  // clearInterval(data.interval);
  // data.timerRunning = false;
  // data.timer = "00:00";
  // data.remainingTime = 0;
};

setInterval(() => {
  const fetchPromises = DATA_FILE_NAMES.map((fileName, idx) => {
    return fetch(`http://localhost:3000/${fileName}.json`)
      .then((response) => response.json())
      .then((data) => ({ [detectedKeys[idx]]: data }))
      .catch((error) => {
        console.error(`Error fetching ${fileName}.json:`, error);
        return { [fileName]: null };
      });
  });

  Promise.all(fetchPromises)
    .then((results) => {
      const currentlyDetected = results.reduce((acc, result) => {
        const key = Object.keys(result)[0];
        return { ...acc, [key]: result[key] };
      }, {}) as Detected;

      if (
        !currentlyDetected.isPresent &&
        [SessionState.BREAK, SessionState.WORK].includes(
          global.value.sessions[0].state
        )
      ) {
        // person is gone, pause the session
        global.value.sessions[0].state = SessionState.PAUSED;
      } else if (
        !global.value.lastDetected.isPresent &&
        currentlyDetected.isPresent
      ) {
        // person is back, resume the session
        global.value.sessions[0].state = global.value.stateBeforePause;
      } else if (
        currentlyDetected.isDistracted ||
        currentlyDetected.isLookingAway
      ) {
        // person is distracted, show alert
        console.log("distracted!");
      } else if (currentlyDetected.isTired || currentlyDetected.isAsleep) {
        // person is tired, show alert
        console.log("tired!");
      }
      global.value.lastDetected = { ...currentlyDetected };
    })
    .catch((error) => {
      console.error("Error fetching data files:", error);
    });
}, DATA_CHECK_DEBOUNCE);
</script>

<style scoped>
@import url("../style.css");

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
}

.icon-container.hide {
  opacity: 0;
}

.text-container {
  text-align: center;
}

.focus-on {
  animation: slideInLeft 1s ease;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
