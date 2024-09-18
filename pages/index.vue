<!-- pages\index.vue -->

<template>
  <div>
    <!-- Quick overview section -->
    <section>
      <div class="flex justify-end">
        <UButton class="mr-4" to="/cash-in" size="lg">Cash In</UButton>
        <UButton to="/cash-out" size="lg">Cash Out</UButton>
      </div>
    </section>

    <section class="mt-3">
      <Dashboard />
    </section>

    <!-- Quick actions section -->
    <UCard>
      <template #header>
        <!-- Recent transactions section -->
        <h2>Recent Transactions</h2>
      </template>
      <section>
        <h3>List of recent transactions</h3>
      </section>
      <!-- TODO: Add component to display recent cash in/out entries -->
    </UCard>
  </div>
</template>

<script setup>
// Page-specific logic goes here
// For example, fetching initial data or setting up page-specific state

// TODO: Import necessary components (e.g., Dashboard, RecentTransactions)
// TODO: Fetch initial data for the dashboard and recent transactions
</script>
