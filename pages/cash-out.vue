<!-- pages/cash-out.vue -->

<template>
  <UCard>
    <template #header>
      <h1>Record Cash Out</h1>
    </template>
    <section class="cash-out-page">
      <!-- Cash Out Form Component -->
      <CashOutForm />

      <!-- Recent Cash Out Transactions -->
      <div class="recent-transactions">
        <UDivider class="my-8" />
        <h2>[TODO] Recent Cash Out Transactions</h2>
        <!-- TODO: Implement component for displaying recent cash out transactions -->
      </div>
    </section>
  </UCard>
</template>

<script setup>
import CashOutForm from '@/components/CashOutForm.vue'
import TransactionList from '@/components/TransactionList.vue'
</script>