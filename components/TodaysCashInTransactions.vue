<!-- components/TodaysCashInTransactions.vue -->
<template>
  <div class="todays-cash-in-transactions">
    <h2>Today's Cash-In Transactions</h2>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="isLoading" class="loading-message">
      Loading today's cash-in transactions...
    </div>
    <ul v-else-if="todaysTransactions.length" class="transaction-items">
      <li v-for="transaction in todaysTransactions" :key="transaction.id" class="transaction-item flex ">
        <div>
          <div class="transaction-time">{{ formatTime(transaction.date) }}</div>
          <div class="transaction-amount cash-in">
            +${{ transaction.amount.toFixed(2) }}
          </div>
          <div v-if="transaction.notes" class="transaction-notes">
            {{ transaction.notes }}
          </div>
        </div>
        <div class="ml-auto">
          <UButton @click="handleEdit(transaction)" size="lg" variant="outline">
            Edit
          </UButton>
        </div>
      </li>
    </ul>
    <p v-else>No cash-in transactions for today.</p>
    <div class="transaction-summary">
      <div class="total-cash-in">
        <strong>Total Cash In Today: ${{ totalTodaysCashIn.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/dateHelpers'
import { useCashInStore } from '@/stores/cashInStore'

const cashInStore = useCashInStore()
const { isLoading, error } = storeToRefs(cashInStore)

const todaysTransactions = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return cashInStore.cashInTransactions
    .filter(t => new Date(t.date) >= today)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalTodaysCashIn = computed(() => {
  return todaysTransactions.value.reduce((sum, t) => sum + t.amount, 0)
})

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const handleEdit = (transaction) => {
  console.log('Edit button clicked for transaction:', transaction.id)
  // TODO: Implement edit functionality
}

onMounted(async () => {
  await cashInStore.fetchCashInEntries(true)  // Force refresh
})
</script>

<style scoped>
.todays-cash-in-transactions {
  max-width: 600px;
  margin: 0 auto;
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
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
}

.transaction-time {
  font-weight: bold;
}

.transaction-amount {
  font-weight: bold;
}

.transaction-amount.cash-in {
  color: rgb(0, 185, 0);
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
  color: rgb(0, 185, 0);
  font-size: 1.2em;
}
</style>