<!-- components/TransactionList.vue -->

<template>
  <div>
    <h2>Cash In Transactions</h2>
    <UButton @click="refreshTransactions" :loading="cashInStore.isLoading" :disabled="cashInStore.isLoading">
      Refresh
    </UButton>
    <div v-if="cashInStore.error" class="error-message">
      {{ cashInStore.error }}
    </div>
    <ul v-if="cashInStore.cashInTransactions.length">
      <li v-for="transaction in cashInStore.cashInTransactions" :key="transaction.id">
        {{ formatDate(transaction.date) }}: ${{ transaction.amount.toFixed(2) }}
        <span v-if="transaction.notes" class="transaction-notes">
          - {{ transaction.notes }}
        </span>
      </li>
    </ul>
    <p v-else-if="!cashInStore.isLoading">No transactions found.</p>
    <p v-if="cashInStore.isLoading">Loading transactions...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCashInStore } from '~/stores/cashInStore'
import { storeToRefs } from 'pinia'

const cashInStore = useCashInStore()

// Use storeToRefs for reactive state properties
const { cashInTransactions, isLoading, error } = storeToRefs(cashInStore)

onMounted(() => {
  if (cashInStore.cashInTransactions.length === 0) {
    refreshTransactions()
  }
})

const refreshTransactions = () => {
  cashInStore.fetchCashInEntries()
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-bottom: 10px;
}

.transaction-notes {
  font-style: italic;
  color: #666;
}
</style>