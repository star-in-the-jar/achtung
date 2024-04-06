import { defineStore } from "pinia";
import { ref } from "vue";

export const useActiveTabUrlStore = defineStore("active-tab-url", () => {
  const activeTabUrl = ref<string>("");

  return {
    activeTabUrl,
  };
});
