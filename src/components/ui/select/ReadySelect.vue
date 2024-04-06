<template>
  <Select v-model="computedValue" class="w-full">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-nowrap"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from ".";
type Option = {
  value: string;
  label: string;
};

const props = defineProps<{
  options: Option[];
  placeholder?: string;
  modelValue?: string;
}>();

const defaultValue = ref("");
const emit = defineEmits(["change", "update:modelValue"]);

const computedValue = computed({
  get: () => props.modelValue || defaultValue.value,
  set: (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
});

watch(defaultValue, (newValue) => {
  emit("change", newValue);
});
</script>
