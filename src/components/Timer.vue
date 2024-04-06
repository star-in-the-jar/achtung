<template>
    <h1 class="text-2xl"> {{ clock }}</h1>
</template>

<script setup lang="ts">
import { ref } from "vue";

const clock = ref("25:00");

</script>
