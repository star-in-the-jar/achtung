<template>
  <div>
    <h1 class="text-4xl text-center mb-4">Przegląd godzinowy</h1>

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
    name: "Czas przerwy",
    data: [13, 23, 20, 8, 13, 27, 15, 33, 19, 16, 28, 20, 23, 12],
  },
  {
    name: "Czas nieobecności",
    data: [20, 37, 10, 22, 17, 21, 15, 27, 11, 14, 12, 10, 17, 18],
  },
  {
    name: "Czas pracy",
    data: [87, 77, 80, 92, 87, 73, 85, 67, 81, 84, 72, 80, 77, 88],
  },
  {
    name: "Czas rozproszenia",
    data: [19, 13, 15, 8, 13, 27, 15, 23, 17, 20, 12, 20, 17, 18],
  },
];
const chartOptions = {
  chart: {
    type: "bar",
    height: 600,
    stacked: true,
    stackType: "100%",
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
    title: {
      text: "Godzina (czas Warszawski)",
    },
    categories: [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
    ],
  },
  yaxis: {
    title: {
      text: "Czas względem 1 sesji",
    },
  },
  legend: {
    position: "top",
  },
  fill: {
    opacity: 1,
  },
};
</script>
