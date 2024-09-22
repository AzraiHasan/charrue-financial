<!-- pages\index.vue -->

<template>
  <div>
    <section>
      <Dashboard />
    </section>
  </div>
</template>

<script setup>
const ReportGenerator = defineAsyncComponent(() => import('@/components/ReportGenerator.vue'))

// Page-specific logic goes here
// For example, fetching initial data or setting up page-specific state

// TODO: Import necessary components (e.g., Dashboard, RecentTransactions)
// TODO: Fetch initial data for the dashboard and recent transactions
</script>
