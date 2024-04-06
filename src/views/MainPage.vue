<template>
  <div class="main-page">
    <div class="content">
      <h1
        class="text-5xl"
        style="color: black; margin-bottom: 50px"
        v-if="!focusSessionStarted"
      >
        START FOCUS SESSION
      </h1>
      <div
        class="icon-container"
        @click="startFocusSession"
        v-if="!focusSessionStarted"
      >
        <CirclePlay color="black" size="64" class="stroke-1" />
      </div>
      <div class="text-container" v-if="focusSessionStarted">
        <h1 class="focus-on text-5xl" style="color: black; margin-bottom: 50px">
          FOCUS ON
        </h1>
        <div class="timer">
          <h1
            class="focus-on text-5xl"
            style="color: black; margin-bottom: 50px"
          >
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

<script>
import { CirclePlay, CircleStop, FastForward } from "lucide-vue-next";
import { Select } from "@/components/ui/select";
export default {
  name: "MainPage",
  components: {
    CirclePlay,
    CircleStop,
    FastForward,
  },
  data() {
    return {
      focusSessionStarted: false,
      timerRunning: false,
      timer: "25:00",
      interval: null,
      remainingTime: 1500000,
    };
  },
  methods: {
    startFocusSession() {
      this.focusSessionStarted = true;
      this.startTimer();
    },
    startTimer() {
      if (!this.timerRunning) {
        this.interval = setInterval(() => {
          if (this.remainingTime === 0) {
            clearInterval(this.interval);
            this.timerRunning = false;
            return;
          }

          this.remainingTime -= 1000;
          const minutes = Math.floor(this.remainingTime / 60000);
          const seconds = ((this.remainingTime % 60000) / 1000).toFixed(0);
          this.timer = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }, 1000);
        this.timerRunning = true;
      }
    },
    stopTimer() {
      clearInterval(this.interval);
      this.timerRunning = false;
    },
    resetTimer() {
      clearInterval(this.interval);
      this.timerRunning = false;
      this.timer = "00:00";
      this.remainingTime = 0;
    },
  },
};
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
