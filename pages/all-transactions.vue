<!-- pages/all-transactions.vue -->

<script setup>
const TransactionList = defineAsyncComponent(() => import('@/components/TransactionList.vue'))
</script>

<template>
  <TransactionList />
</template>