<template>
  <div>
    <h1 class="text-4xl text-center mb-4">Średni procent czasu skupienia</h1>
    <div id="chart">
      <VueApexCharts
        type="bar"
        height="600"
        :options="chartOptions"
        :series="series"
      ></VueApexCharts>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const series = [
  {
    name: "",
    data: [87, 77, 80, 92, 87, 73, 85],
  },
];
const chartOptions = {
  chart: {
    type: "bar",
    height: 600,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "13px",
            fontWeight: 900,
          },
        },
      },
    },
  },
  xaxis: {
    type: "string",
    categories: [
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
      "Niedziela",
    ],
  },
  legend: {
    position: "top",
  },
  fill: {
    opacity: 1,
  },
};
</script>
