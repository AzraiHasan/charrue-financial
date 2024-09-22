<!-- components/ReportGenerator.vue -->

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Available Weekly Reports</h2>
    <ul v-if="availableReports.length > 0">
      <li v-for="(report, index) in availableReports" :key="index">
        <UButton class="mb-4" size="xl" variant="outline" @click="generateReport(report.startDate, report.endDate)"
          :loading="isGenerating">
          {{ formatDateRange(report.startDate, report.endDate) }}
        </UButton>
      </li>
    </ul>
    <p v-else>No reports available yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { startOfWeek, endOfWeek, format, eachWeekOfInterval, subWeeks } from 'date-fns'
import { useCashInStore } from '@/stores/cashInStore'
import { useCashOutStore } from '@/stores/cashOutStore'

const cashInStore = useCashInStore()
const cashOutStore = useCashOutStore()

const availableReports = ref([])
const isGenerating = ref(false)

onMounted(async () => {
  try {
    await fetchData()
    generateAvailableReports()
  } catch (error) {
    console.error('Failed to load report data:', error)
  }
})

const fetchData = async () => {
  try {
    await Promise.all([
      cashInStore.fetchCashInEntries(),
      cashOutStore.fetchCashOutEntries()
    ])
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch transaction data')
  }
}

const generateAvailableReports = () => {
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 })
  const startDate = startOfWeek(subWeeks(endDate, 11), { weekStartsOn: 1 })

  availableReports.value = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 }
  )
    .map(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 })
      return {
        startDate: weekStart,
        endDate: weekEnd,
        hasData: hasDataForWeek(weekStart, weekEnd)
      }
    })
    .filter(week => week.hasData)
    .reverse() // Most recent first
}

const hasDataForWeek = (start, end) => {
  return cashInStore.cashInTransactions.some(t => {
    const date = new Date(t.date)
    return date >= start && date <= end
  }) || cashOutStore.cashOutTransactions.some(t => {
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
    const cashInData = cashInStore.cashInTransactions.filter(t => {
      const date = new Date(t.date)
      return date >= startDate && date <= endDate
    })
    const cashOutData = cashOutStore.cashOutTransactions.filter(t => {
      const date = new Date(t.date)
      return date >= startDate && date <= endDate
    })

    const csvContent = generateCSV(cashInData, cashOutData, startDate, endDate)
    downloadCSV(csvContent, `weekly_report_${format(startDate, 'yyyy-MM-dd')}.csv`)
    console.log('Report generated and downloaded successfully')
  } catch (error) {
    console.error('Error generating report:', error)
  } finally {
    isGenerating.value = false
  }
}

const generateCSV = (cashInData, cashOutData, startDate, endDate) => {
  try {
    let csv = 'Date,Type,Category,Amount,Notes\n'

    cashInData.forEach(t => {
      csv += `${t.date},Cash In,Income,${t.amount},${t.notes || ''}\n`
    })

    cashOutData.forEach(t => {
      csv += `${t.date},Cash Out,${t.category},${t.amount},${t.notes || ''}\n`
    })

    return csv
  } catch (error) {
    console.error('Error generating CSV:', error)
    throw new Error('Failed to generate CSV content')
  }
}

const downloadCSV = (content, fileName) => {
  try {
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
    } else {
      throw new Error('Browser does not support downloading')
    }
  } catch (error) {
    console.error('Error downloading CSV:', error)
    throw new Error('Failed to download CSV file')
  }
}
</script>