<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { onClickOutside, useCurrentElement } from "@vueuse/core";
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from "radix-vue";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";
import { type Option } from "@/types";

const props = defineProps<{
  options: Option[];
  placeholder: string;
  modelValue: string[];
}>();

const emit = defineEmits(["update:modelValue"]);

const { options } = toRefs(props);

const computedModelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    console.log(value);
    emit("update:modelValue", value);
  },
});

const comboboxRef = ref();
const $combobox = useCurrentElement(comboboxRef);

const open = ref(false);
const searchTerm = ref("");

onClickOutside($combobox, () => {
  open.value = false;
});

const filteredToShowItems = computed(() =>
  options.value.filter((i) => !computedModelValue.value.includes(i.label))
);

const selectedItems = computed(() => {
  return options.value
    .filter((i) => computedModelValue.value.includes(i.label))
    .map((i) => i.label);
});

const handleItemDelete = (desiredItemToDelete: Option) => {
  console.log(desiredItemToDelete);
  console.log(computedModelValue.value);
  computedModelValue.value = computedModelValue.value.filter((item) => {
    return item !== desiredItemToDelete;
  });
};
</script>

<template>
  <TagsInput
    class="gap-x-2 w-80 inline-flex items-center flex-wrap px-3"
    :model-value="selectedItems"
  >
    <div
      class="flex flex-wrap items-center gap-2"
      v-show="modelValue.length > 0"
    >
      <TagsInputItem
        v-for="item in computedModelValue"
        :key="item"
        :value="item"
      >
        <TagsInputItemText />
        <TagsInputItemDelete @click="handleItemDelete(item)" />
      </TagsInputItem>
    </div>

    <ComboboxRoot
      v-model="selectedItems"
      v-model:open="open"
      v-model:searchTerm="searchTerm"
      ref="comboboxRef"
    >
      <ComboboxAnchor as-child>
        <ComboboxInput :placeholder="placeholder" as-child>
          <TagsInputInput class="w-full" @keydown.enter.prevent />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <CommandList
          position="popper"
          class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandEmpty />
          <CommandGroup>
            <CommandItem
              v-for="framework in filteredToShowItems"
              :key="framework.value"
              :value="framework.label"
              @select.prevent="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    searchTerm = '';
                    modelValue.push(ev.detail.value);
                  }

                  if (filteredToShowItems.length === 0) {
                    open = false;
                  }
                }
              "
            >
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
