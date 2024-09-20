<!-- components/Dashboard.vue -->

<template>
  <UCard class="mb-4">
    <!-- Cash-in vs Cash-out Chart -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Cash-in vs Cash-out</h2>
      <DashboardChart />
    </div>
  </UCard>
  <!-- <UCard class="mb-4">
    <div>
      <h3>Weekly Expenses by Category</h3>
      <h1>TODO: Display total cash-out by category for the current week</h1>
    </div>
  </UCard> -->

  <UCard class="mb-4">
    <!-- Running Total of Cash-in-hand -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Weekly Expenses vs Cash in Hand</h2>
      <!-- TODO: Display running total of cash-in-hand -->
      <FinancialSummaryChart />
    </div>
    <div class="mt-4">
      <UButton block to="/cash-out" size="lg">Record Cash Out</UButton>
    </div>
  </UCard>

</template>

<script setup>
import FinancialSummaryChart from './FinancialSummaryChart.vue';

// TODO: Import necessary composables or stores

// Reactive data
const cashInHand = ref(0)
const weeklyExpenses = ref([])
const thresholdReached = ref(false)

// Fetch dashboard data
const fetchDashboardData = async () => {
  // TODO: Implement data fetching logic
  // This should update cashInHand, weeklyExpenses, and thresholdReached
}

// Lifecycle hook
onMounted(() => {
  fetchDashboardData()
})
</script>
