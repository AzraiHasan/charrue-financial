<!-- components/TransactionList.vue -->

<template>
  <div class="transaction-list">
    <h2 class="text-xl font-semibold">All Transactions</h2>
    <div class="controls my-4">
      <p v-if="lastUpdated">Last updated: {{ formatDate(lastUpdated) }}</p>
      <UButton @click="refreshTransactions" :loading="isLoading" :disabled="isLoading" size="lg"> Refresh
      </UButton>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="isLoading" class="loading-message">
      Loading transactions...
    </div>
    <ul v-else-if="combinedTransactions.length" class="transaction-items">
      <li v-for="transaction in combinedTransactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
        <div :class="['transaction-amount', transaction.type === 'cash-in' ? 'cash-in' : 'cash-out']">
          {{ transaction.type === 'cash-in' ? '+' : '-' }}${{ transaction.amount.toFixed(2) }}
        </div>
        <div class="transaction-type">{{ transaction.type === 'cash-in' ? 'Cash In' : 'Cash Out' }}</div>
        <div v-if="transaction.category" class="transaction-category">
          Category: {{ transaction.category }}
        </div>
        <div v-if="transaction.notes" class="transaction-notes">
          {{ transaction.notes }}
        </div>
      </li>
    </ul>
    <p v-else>No transactions found.</p>
    <div class="transaction-summary">
      <div class="total-cash-in">
        <strong>Total Cash In: ${{ totalCashIn.toFixed(2) }}</strong>
      </div>
      <div class="total-cash-out">
        <strong>Total Cash Out: ${{ totalCashOut.toFixed(2) }}</strong>
      </div>
      <div class="net-cash">
        <strong>Net Cash: ${{ netCash.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
const cashInStore = useCashInStore()
const cashOutStore = useCashOutStore()

const { isLoading: cashInLoading, error: cashInError } = storeToRefs(cashInStore)
const { isLoading: cashOutLoading, error: cashOutError } = storeToRefs(cashOutStore)

const isLoading = computed(() => cashInLoading.value || cashOutLoading.value)
const error = computed(() => cashInError.value || cashOutError.value)

const lastUpdated = ref(null)

const combinedTransactions = computed(() => {
  const cashInTransactions = cashInStore.cashInTransactions.map(t => ({ ...t, type: 'cash-in' }))
  const cashOutTransactions = cashOutStore.cashOutTransactions.map(t => ({ ...t, type: 'cash-out' }))
  return [...cashInTransactions, ...cashOutTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalCashIn = computed(() => cashInStore.totalCashIn)
const totalCashOut = computed(() => cashOutStore.totalCashOut)
const netCash = computed(() => totalCashIn.value - totalCashOut.value)

onMounted(async () => {
  await refreshTransactions()
})

const refreshTransactions = async (forceRefresh = true) => {
  await Promise.all([
    cashInStore.fetchCashInEntries(forceRefresh),
    cashOutStore.fetchCashOutEntries(forceRefresh)
  ])
  lastUpdated.value = new Date()
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.transaction-list {
  max-width: 800px;
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
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
}

.transaction-date {
  font-weight: bold;
}

.transaction-amount {
  font-weight: bold;
}

.transaction-amount.cash-in {
  color: green;
}

.transaction-amount.cash-out {
  color: red;
}

.transaction-type {
  font-style: italic;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.total-cash-in {
  color: green;
}

.total-cash-out {
  color: red;
}

.net-cash {
  grid-column: 1 / -1;
  font-size: 1.2em;
  text-align: right;
}
</style>