<!-- pages\index.vue -->

<template>
  <div>
    <!-- Quick overview section -->

    <section class="mt-3">
      <Dashboard />
    </section>

    <!-- Quick actions section -->
    <section>
      <div class="flex justify-between items-center my-6">
        <h2 class="ml-4 text-xl font-semibold">Quick Actions</h2>
        <div>
          <UButton class="mr-4" to="/cash-in" size="lg">Cash In</UButton>
          <UButton to="/cash-out" size="lg">Cash Out</UButton>
        </div>
      </div>
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
