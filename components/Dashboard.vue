<!-- components/Dashboard.vue -->

<template>

  <UCard class="mb-4">
    <!-- Cash-in vs Cash-out Chart -->
    <div class="chart">
      <h3 class="mb-4">Cash-in vs Cash-out</h3>
      <!-- TODO: Implement chart using Chart.js -->
      <!-- TODO: Implement threshold indicator -->
      <TestChart />
    </div>
  </UCard>
  <UCard class="mb-4">
    <!-- Total Cash-out by Category per Week -->
    <div class="cash-out-by-category">
      <h3>Weekly Expenses by Category</h3>
      <!-- TODO: Display total cash-out by category for the current week -->
      <h1>TODO: Display total cash-out by category for the current week</h1>
    </div>
  </UCard>

  <UCard class="mb-4">
    <!-- Running Total of Cash-in-hand -->
    <div class="cash-in-hand">
      <h3>Cash in Hand</h3>
      <!-- TODO: Display running total of cash-in-hand -->
      <h1>TODO: Display running total of cash-in-hand</h1>
    </div>
    <div class="mt-4">
      <UButton block to="/cash-out" size="lg">Record Cash Out</UButton>
    </div>
  </UCard>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import TestChart from './TestChart.vue';
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
