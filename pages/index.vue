<!-- pages\index.vue -->

<template>
  <div>
    <h1>Welcome to Coconut Shake Financial Tracker</h1>

    <TestDatabase />

    <!-- Quick overview section -->
    <section>
      <h2 class="my-4">Financial Overview</h2>
      <!-- TODO: Add Dashboard component -->
      <Dashboard />
    </section>

    <!-- Quick actions section -->
    <UCard class="my-4">
      <h2>Quick Actions</h2>
      <section class="my-4">
        <UButton to="/cash-in" class="mr-3">Cash In</UButton>
        <UButton to="/cash-out">Cash Out</UButton>
      </section>
    </UCard>
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
