<!-- components/FinancialSummaryChart.vue -->
<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <div class="space-y-2">
        <USkeleton class="h-[250px]" />
      </div>
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { groupExpensesByWeekAndCategory, calculateWeeklyCashInHand } from '@/utils/financialCalculations'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const cashInStore = useCashInStore()
const cashOutStore = useCashOutStore()
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    await Promise.all([
      cashInStore.fetchCashInEntries(),
      cashOutStore.fetchCashOutEntries()
    ])
    isLoading.value = false
  } catch (e) {
    error.value = 'Failed to load data. Please try again.'
    isLoading.value = false
  }
})

const categories = [
  { name: 'Ingredients', color: 'white' },
  { name: 'Supplies', color: 'rgb(255, 153, 153)' }, // rose
  { name: 'Equipment', color: 'rgb(153, 255, 255)' }, // cyan
  { name: 'Rent', color: 'rgb(255, 0, 255)' }, // fuchsia
  { name: 'Utilities', color: 'yellow' },
  { name: 'Salary', color: 'rgb(203, 213, 225)' }, // slate
  { name: 'Other', color: 'rgb(214, 211, 209)' } // stone
]

const chartData = computed(() => {
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 28) // 4 weeks ago

  const expensesByWeek = groupExpensesByWeekAndCategory(cashOutStore.cashOutTransactions, startDate, endDate)
  const cashInHandByWeek = calculateWeeklyCashInHand(cashInStore.cashInTransactions, cashOutStore.cashOutTransactions, startDate, endDate)

  const labels = Object.keys(expensesByWeek)

  return {
    labels,
    datasets: [
      ...categories.map(category => ({
        label: category.name,
        data: labels.map(week => expensesByWeek[week][category.name]),
        backgroundColor: category.color,
      })),
      {
        label: 'Cash in Hand',
        data: labels.map(week => cashInHandByWeek[week]),
        type: 'line',
        borderColor: 'rgb(34, 197, 94)', // green
        borderDash: [5, 5],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.1,

      }
    ]
  }
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      title: {
        display: true,
        text: 'Expenses'
      }
    },
    /* y1: {
      position: 'right',
      beginAtZero: true,
      title: {
        display: false,
        text: 'Cash in Hand'
      }
    } */
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  }
})
</script>

<style scoped>
.chart-container {
  height: 400px;
}
</style>