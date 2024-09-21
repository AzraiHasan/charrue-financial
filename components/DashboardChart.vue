<!-- components/DashboardChart.vue -->

<!-- TODO: Implement threshold indicator -->

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
    <!-- Chart Section -->
    <div v-else class="chart-container ">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const cashInStore = useCashInStore()
const cashOutStore = useCashOutStore()

// Computed property for chart data
const chartData = computed(() => {
  const dateMap = new Map()
  const today = new Date()
  const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)

  // Initialize the last 7 days in the map
  for (let i = 0;i < 7;i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
    const formattedDate = formatDateShort(date)
    dateMap.set(formattedDate, { cashIn: 0, cashOut: 0 })
  }

  const combinedTransactions = [
    ...cashInStore.cashInTransactions.map(t => ({ ...t, type: 'cash-in' })),
    ...cashOutStore.cashOutTransactions.map(t => ({ ...t, type: 'cash-out' }))
  ]

  combinedTransactions.forEach(t => {
    const transactionDate = new Date(t.date)
    if (transactionDate >= sevenDaysAgo && transactionDate <= today) {
      const formattedDate = formatDateShort(t.date)
      const dayData = dateMap.get(formattedDate) || { cashIn: 0, cashOut: 0 }
      if (t.type === 'cash-in') {
        dayData.cashIn += t.amount
      } else {
        dayData.cashOut += t.amount
      }
      dateMap.set(formattedDate, dayData)
    }
  })

  const sortedDates = Array.from(dateMap.keys()).sort((a, b) =>
    new Date(b.split(' ')[1] + ' ' + b.split(' ')[0] + ' ' + today.getFullYear()) -
    new Date(a.split(' ')[1] + ' ' + a.split(' ')[0] + ' ' + today.getFullYear())
  )

  return {
    labels: sortedDates,
    datasets: [
      {
        label: 'Cash In',
        backgroundColor: 'lime',
        borderColor: 'green',
        pointRadius: 4,
        pointHitRadius: 15,
        data: sortedDates.map(date => dateMap.get(date).cashIn),
      },
      {
        label: 'Cash Out',
        backgroundColor: 'rose',
        pointRadius: 4,
        pointHitRadius: 15,
        borderColor: 'red',
        data: sortedDates.map(date => dateMap.get(date).cashOut),
      }
    ]
  }
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    },
    x: {
      reverse: true // This will display the dates from left to right (oldest to newest)
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        title: (context) => {
          return context[0].label;
        }
      }
    }
  }
})
</script>

<style scoped>
.chart-container {
  height: 300px;
}
</style>