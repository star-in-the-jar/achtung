<template>
  <div class="main-page">
    <div class="content">
      <h1 class="text-5xl" style="color: black; margin-bottom: 50px">
        START FOCUS SESSION
      </h1>
      <div class="icon-container">
        <CirclePlay color="black" size="64" class="stroke-1" />
      </div>
    </div>
  </div>
</template>

<script>
import { CirclePlay } from "lucide-vue-next";
export default {
  name: "MainPage",
  components: {
    CirclePlay,
  },
};
</script>

<style scoped>
@import url("../style.css");
.title {
  font-weight: bold;
  color: black;
  margin-bottom: 50px;
}
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
