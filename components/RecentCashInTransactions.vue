<!-- components/RecentCashInTransactions.vue -->
<template>
  <div class="recent-cash-in-transactions">
    <h2 class="text-xl font-semibold">Cash-In Transactions (Last 30 Days)</h2>
    <div class="controls my-4">
      <p v-if="lastUpdated">Last updated: {{ formatDate(lastUpdated) }}</p>
      <UButton @click="refreshTransactions" :loading="isLoading" :disabled="isLoading">
        Refresh
      </UButton>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="isLoading" class="loading-message">
      Loading recent cash-in transactions...
    </div>
    <ul v-else-if="recentTransactions.length" class="transaction-items">
      <li v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
        <div class="transaction-amount cash-in">
          +${{ transaction.amount.toFixed(2) }}
        </div>
        <div v-if="transaction.notes" class="transaction-notes">
          {{ transaction.notes }}
        </div>
      </li>
    </ul>
    <p v-else>No recent cash-in transactions found.</p>
    <div class="transaction-summary">
      <div class="total-cash-in">
        <strong>Total Cash In (Last 30 Days): ${{ totalRecentCashIn.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/dateHelpers'
import { useCashInStore } from '@/stores/cashInStore'

const cashInStore = useCashInStore()
const { isLoading, error } = storeToRefs(cashInStore)

const lastUpdated = ref(null)

const recentTransactions = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  return cashInStore.cashInTransactions
    .filter(t => new Date(t.date) >= thirtyDaysAgo)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalRecentCashIn = computed(() => {
  return recentTransactions.value.reduce((sum, t) => sum + t.amount, 0)
})

onMounted(async () => {
  await refreshTransactions()
})

const refreshTransactions = async () => {
  await cashInStore.fetchCashInEntries(true)  // Force refresh
  lastUpdated.value = new Date()
}
</script>

<style scoped>
.recent-cash-in-transactions {
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.transaction-date {
  font-weight: bold;
}

.transaction-amount {
  font-weight: bold;
  text-align: right;
}

.transaction-amount.cash-in {
  color: green;
}

.transaction-notes {
  grid-column: 1 / -1;
  font-style: italic;
  color: #666;
}

.transaction-summary {
  margin-top: 1rem;
  text-align: right;
}

.total-cash-in {
  color: green;
  font-size: 1.2em;
}
</style>