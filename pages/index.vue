<!-- pages\index.vue -->

<template>
  <div>
    <!-- Quick overview section -->

    <section>
      <Dashboard />
    </section>

    <UCard>
      <template #header>
        <TransactionList />
      </template>
      <!-- TODO: Add component to display recent cash in/out entries -->
    </UCard>
  </div>
</template>

<script setup>
import TransactionList from '~/components/TransactionList.vue';

// Page-specific logic goes here
// For example, fetching initial data or setting up page-specific state

// TODO: Import necessary components (e.g., Dashboard, RecentTransactions)
// TODO: Fetch initial data for the dashboard and recent transactions
</script>
