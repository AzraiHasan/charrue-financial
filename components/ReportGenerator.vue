<!-- components/ReportGenerator.vue -->

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Available Weekly Reports</h2>
    <div v-if="isLoading">
      <ULoader size="lg" />
      <p class="mt-2">Loading ...</p>
    </div>
    <div v-else>
      <ul v-if="availableReports.length > 0">
        <li v-for="(report, index) in availableReports" :key="index">
          <UButton class="mb-4" size="xl" variant="outline" @click="generateReport(report.startDate, report.endDate)"
            :loading="isGenerating">
            {{ formatDateRange(report.startDate, report.endDate) }}
          </UButton>
        </li>
      </ul>
      <p v-else class="text-xl font-semibold mb-4">No reports available yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { startOfWeek, endOfWeek, format, eachWeekOfInterval, subDays, min } from 'date-fns'
import { useDatabase } from '@/composables/useDatabase'

const { STORES, initDB, getAllItems } = useDatabase()

const availableReports = ref([])
const isGenerating = ref(false)
const isLoading = ref(true)

onMounted(async () => {
  try {
    await fetchData()
    await generateAvailableReports()
    isLoading.value = false
  } catch (error) {
    console.error('Failed to load report data:', error)
    isLoading.value = false
  }
})

const fetchData = async () => {
  try {
    await initDB() // Ensure IndexedDB is initialized
  } catch (error) {
    console.error('Error initializing database:', error)
    throw new Error('Failed to initialize database')
  }
}

const generateAvailableReports = async () => {
  try {
    const cashInData = await getAllItems(STORES.CASH_IN)
    const cashOutData = await getAllItems(STORES.CASH_OUT)

    if (cashInData.length === 0 && cashOutData.length === 0) {
      return // No data available
    }

    const allDates = [...cashInData, ...cashOutData].map(t => new Date(t.date))
    const firstEntryDate = min(allDates)
    const yesterday = subDays(new Date(), 1)
    const endDate = endOfWeek(yesterday, { weekStartsOn: 1 })
    const startDate = startOfWeek(firstEntryDate, { weekStartsOn: 1 })

    availableReports.value = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 }
    )
      .map(weekStart => {
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 })
        return {
          startDate: weekStart,
          endDate: weekEnd,
          hasData: hasDataForWeek(weekStart, weekEnd, cashInData, cashOutData)
        }
      })
      .filter(week => week.hasData)
      .reverse() // Most recent first
  } catch (error) {
    console.error('Error generating available reports:', error)
    throw error
  }
}

const hasDataForWeek = (start, end, cashInData, cashOutData) => {
  return cashInData.some(t => {
    const date = new Date(t.date)
    return date >= start && date <= end
  }) || cashOutData.some(t => {
    const date = new Date(t.date)
    return date >= start && date <= end
  })
}

const formatDateRange = (start, end) => {
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
}

const generateReport = async (startDate, endDate) => {
  isGenerating.value = true
  try {
    const cashInData = await getAllItems(STORES.CASH_IN)
    const cashOutData = await getAllItems(STORES.CASH_OUT)

    const weekCashIn = cashInData.filter(t => {
      const date = new Date(t.date)
      return date >= startDate && date <= endDate
    })
    const weekCashOut = cashOutData.filter(t => {
      const date = new Date(t.date)
      return date >= startDate && date <= endDate
    })

    const csvContent = generateCSV(weekCashIn, weekCashOut, startDate, endDate)
    downloadCSV(csvContent, `weekly_report_${format(startDate, 'yyyy-MM-dd')}.csv`)
  } catch (error) {
    console.error('Error generating report:', error)
  } finally {
    isGenerating.value = false
  }
}

const generateCSV = (cashInData, cashOutData, startDate, endDate) => {
  let csv = 'Date,Type,Category,Amount,Notes\n'

  cashInData.forEach(t => {
    csv += `${t.date},Cash In,Income,${t.amount},${t.notes || ''}\n`
  })

  cashOutData.forEach(t => {
    csv += `${t.date},Cash Out,${t.category},${t.amount},${t.notes || ''}\n`
  })

  return csv
}

const downloadCSV = (content, fileName) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>