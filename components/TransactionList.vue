<!-- components/TransactionList.vue -->

<template>
  <div class="transaction-list">
    <h2 class="mb-4">Cash In Transactions</h2>
    <div class="controls">
      <p v-if="lastUpdated">Last updated: {{ formatDate(lastUpdated) }}</p>
      <UButton @click="refreshTransactions" :loading="cashInStore.isLoading" :disabled="cashInStore.isLoading"
        size="lg">
        Refresh
      </UButton>
    </div>
    <div v-if="cashInStore.error" class="error-message">
      {{ cashInStore.error }}
    </div>
    <div v-if="cashInStore.isLoading" class="loading-message">
      Loading transactions...
    </div>
    <ul v-else-if="cashInStore.cashInTransactions.length" class="transaction-items">
      <li v-for="transaction in cashInStore.cashInTransactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
        <div class="transaction-amount">${{ transaction.amount.toFixed(2) }}</div>
        <div v-if="transaction.notes" class="transaction-notes">
          {{ transaction.notes }}
        </div>
      </li>
    </ul>
    <p v-else>No transactions found.</p>
    <div class="total-cash-in">
      <strong>Total Cash In: ${{ cashInStore.totalCashIn.toFixed(2) }}</strong>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCashInStore } from '~/stores/cashInStore'
import { storeToRefs } from 'pinia'

const cashInStore = useCashInStore()

// Use storeToRefs for reactive state properties
const { cashInTransactions, isLoading, error } = storeToRefs(cashInStore)

const lastUpdated = ref(null)

onMounted(async () => {
  await refreshTransactions()
})

const refreshTransactions = async (forceRefresh = true) => {
  await cashInStore.fetchCashInEntries(forceRefresh)
  lastUpdated.value = new Date()
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.transaction-list {
  max-width: 600px;
  margin: 0 auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}

.loading-message {
  text-align: center;
  margin: 1rem 0;
}

.transaction-items {
  list-style-type: none;
  padding: 0;
}

.transaction-item {
  border-bottom: 1px solid #eee;
  padding: 0.5rem 0;
}

.transaction-date {
  font-weight: bold;
}

.transaction-amount {
  color: green;
}

.transaction-notes {
  font-style: italic;
  color: #666;
}

.total-cash-in {
  margin-top: 1rem;
  text-align: right;
}
</style>