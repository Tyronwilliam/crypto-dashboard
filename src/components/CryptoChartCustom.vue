<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

const props = defineProps<{
  data: [number, number][]
  label: string
}>()

const labels = computed(() =>
  props.data.map(([timestamp]) => new Date(timestamp).toLocaleDateString())
)

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: `${props.label}`,
      data: props.data.map(([_, value]) => value),
      borderColor: 'rgb(117, 23, 248 )',
      backgroundColor: 'rgb(117, 23, 248 , 0.05)',
      fill: true,
      tension: 0.4,
      pointRadius: 2
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: function (this: any, tickValue: string | number): string {
          const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue)
          return Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 3
          }).format(value)
        }
      }
    }
  }
}
</script>

<template>
  <!-- <div class="custom-chart"> -->
  <Line :data="chartData" :options="chartOptions" />
  <!-- </div> -->
</template>

<style lang="scss">
.container-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
