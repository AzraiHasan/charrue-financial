<!-- pages/cash-out.vue -->

<template>
  <UCard>
    <template #header>
      <h1>Record Cash Out</h1>
    </template>
    <section class="cash-out-page">
      <!-- Cash Out Form Component -->
      <CashOutForm />

      <!-- Today's Cash Out Transactions -->
      <div class="today-transactions">
        <UDivider class="my-8" />
        <TodaysTransactions :store="cashOutStore" transactionType="Cash Out" :showCategory="true" />
      </div>
      <!-- Recent Cash Out Transactions -->
      <div class="recent-transactions">
        <UDivider class="my-8" />
        <RecentCashOutTransactions />
      </div>
    </section>
  </UCard>
</template>

<script setup>
const cashOutStore = useCashOutStore()
</script>