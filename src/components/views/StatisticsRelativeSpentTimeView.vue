<template>
  <div class="page-wrapper !justify-start pt-[55px] flex flex-col">
    <div class="max-w-[900px] w-full flex flex-col justify-start gap-y-[23px]">
      <Tabs
        default-value="per-hour"
        class="w-[400px]"
        v-model:model-value="selectedTab"
      >
        <TabsList>
          <TabsTrigger value="per-hour"> Przegląd godzinowy </TabsTrigger>
          <TabsTrigger value="break-and-work-duration">
            Czas pracy/przerwy
          </TabsTrigger>
          <TabsTrigger value="average-focus">
            Średni procent czasu skupienia
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div class="w-full bg-white py-[17px] px-[19px] rounded-[6px]">
        <RouterLink
          class="inline-flex items-center gap-x-2 hover:-translate-x-1 transition-transform mb-4"
          to="/"
        >
          <ArrowLeft :size="24" class="stroke-slate-900" />
          <span class="text-lg">Back</span>
        </RouterLink>
        <PerHourCountent v-if="selectedTab === 'per-hour'" />
        <BreakAndWorkDurationContent
          v-else-if="selectedTab === 'break-and-work-duration'"
        />
        <AverageFocusContent v-else-if="selectedTab === 'average-focus'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakAndWorkDurationContent from "@/components/tabs/BreakAndWorkDurationContent.vue";
import PerHourCountent from "@/components/tabs/PerHourContent.vue";
import AverageFocusContent from "@/components/tabs/AverageFocusContent.vue";
import { ArrowLeft } from "lucide-vue-next";
import { ref } from "vue";

const selectedTab = ref("per-hour");
</script>
