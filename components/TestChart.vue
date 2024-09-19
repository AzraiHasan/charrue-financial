<!-- components/TestChart.vue -->
<template>
  <div class="chart-container my-8">
    <Line :data="chartData" :options="chartOptions" />
  </div>

  <div class="controls my-4">
    <UButton block class="mr-4" to="/cash-in" size="lg">Record Cash In</UButton>
  </div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCashInStore } from '~/stores/cashInStore'
import { useCashOutStore } from '~/stores/cashOutStore'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const cashInStore = useCashInStore()
const cashOutStore = useCashOutStore()

const { isLoading: cashInLoading, error: cashInError } = storeToRefs(cashInStore)
const { isLoading: cashOutLoading, error: cashOutError } = storeToRefs(cashOutStore)

const isLoading = computed(() => cashInLoading.value || cashOutLoading.value)
const error = computed(() => cashInError.value || cashOutError.value)

const lastUpdated = ref(null)

const combinedTransactions = computed(() => {
  const cashInTransactions = cashInStore.cashInTransactions.map(t => ({ ...t, type: 'cash-in' }))
  const cashOutTransactions = cashOutStore.cashOutTransactions.map(t => ({ ...t, type: 'cash-out' }))
  return [...cashInTransactions, ...cashOutTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalCashIn = computed(() => cashInStore.totalCashIn)
const totalCashOut = computed(() => cashOutStore.totalCashOut)
const netCash = computed(() => totalCashIn.value - totalCashOut.value)

onMounted(async () => {
  await refreshTransactions()
})

const refreshTransactions = async (forceRefresh = true) => {
  await Promise.all([
    cashInStore.fetchCashInEntries(forceRefresh),
    cashOutStore.fetchCashOutEntries(forceRefresh)
  ])
  lastUpdated.value = new Date()
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

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

  combinedTransactions.value.forEach(t => {
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
        data: sortedDates.map(date => dateMap.get(date).cashIn),
      },
      {
        label: 'Cash Out',
        backgroundColor: 'rose',
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