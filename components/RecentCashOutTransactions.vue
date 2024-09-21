<!-- components/RecentCashOutTransactions.vue -->
<template>
  <div class="recent-cash-out-transactions">
    <div class="controls my-4">
      <p v-if="lastUpdated">Last updated: {{ formatDate(lastUpdated) }}</p>
      <UButton to="/all-transactions">
        All Transactions
      </UButton>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="isLoading" class="loading-message">
      Loading recent cash-out transactions...
    </div>
    <ul v-else-if="recentTransactions.length" class="transaction-items">
      <li v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
        <div class="transaction-amount cash-out">
          -${{ transaction.amount.toFixed(2) }}
        </div>
        <div class="transaction-category">
          {{ transaction.category }}
        </div>
        <div v-if="transaction.notes" class="transaction-notes">
          {{ transaction.notes }}
        </div>
      </li>
    </ul>
    <p v-else>No recent cash-out transactions found.</p>
    <div class="transaction-summary">
      <div class="total-cash-out">
        <strong>Total Cash Out Last 30 Days: ${{ totalRecentCashOut.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/dateHelpers'
import { useCashOutStore } from '@/stores/cashOutStore'

const cashOutStore = useCashOutStore()
const { isLoading, error } = storeToRefs(cashOutStore)

const lastUpdated = ref(null)

const recentTransactions = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  return cashOutStore.cashOutTransactions
    .filter(t => new Date(t.date) >= thirtyDaysAgo)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalRecentCashOut = computed(() => {
  return recentTransactions.value.reduce((sum, t) => sum + t.amount, 0)
})

onMounted(async () => {
  await refreshTransactions()
})

const refreshTransactions = async () => {
  await cashOutStore.fetchCashOutEntries(true)  // Force refresh
  lastUpdated.value = new Date()
}
</script>

<style scoped>
.recent-cash-out-transactions {
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

.transaction-amount.cash-out {
  color: red;
}

.transaction-category {
  grid-column: 1 / -1;
  color: #555;
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

.total-cash-out {
  color: red;
  font-size: 1.2em;
}
</style>