<template>
  <TagsInput v-model="computedModelValue">
    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput :placeholder="placeholder" />
  </TagsInput>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  TagsInput,
  TagsInputItem,
  TagsInputItemText,
  TagsInputItemDelete,
  TagsInputInput,
} from ".";

const props = defineProps<{
  modelValue: string[];
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const computedModelValue = computed<string[]>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
