<!-- components/TodaysTransactions.vue -->
<template>
  <div class="todays-transactions">
    <h2>{{ title }}</h2>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="isLoading" class="loading-message">
      Loading today's {{ transactionType }} transactions...
    </div>
    <ul v-else-if="todaysTransactions.length" class="transaction-items">
      <li v-for="transaction in todaysTransactions" :key="transaction.id" class="transaction-item flex">
        <div>
          <div class="transaction-time">{{ formatTime(transaction.date) }}</div>
          <div :class="['transaction-amount', transactionClass]">
            {{ transactionPrefix }}${{ transaction.amount.toFixed(2) }}
          </div>
          <div v-if="transaction.notes" class="transaction-notes">
            {{ transaction.notes }}
          </div>
          <div v-if="showCategory && transaction.category" class="transaction-category">
            {{ transaction.category }}
          </div>
        </div>
        <div class="ml-auto">
          <UButton @click="handleEdit(transaction)" size="lg" variant="outline">
            Edit
          </UButton>
        </div>
      </li>
    </ul>
    <p v-else>No {{ transactionType }} transactions for today.</p>
    <div class="transaction-summary">
      <div :class="['total-transaction', transactionClass]">
        <strong>Total {{ transactionType }} Today: ${{ totalToday.toFixed(2) }}</strong>
      </div>
    </div>

    <UModal v-model="isEditModalOpen">
      <TransactionEditForm v-if="editingTransaction" :transaction="editingTransaction" :showCategory="showCategory"
        @update="handleUpdate" @cancel="isEditModalOpen = false" />
    </UModal>
    <!-- <UNotification v-model="showNotification" :color="notificationColor" :icon="notificationIcon">
      {{ notificationMessage }}
    </UNotification> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/dateHelpers'
import TransactionEditForm from './TransactionEditForm.vue'

const props = defineProps({
  store: {
    type: Object,
    required: true
  },
  transactionType: {
    type: String,
    required: true,
    validator: (value) => ['Cash In', 'Cash Out'].includes(value)
  },
  showCategory: {
    type: Boolean,
    default: false
  }
})

const { isLoading, error } = storeToRefs(props.store)

const isEditModalOpen = ref(false)
const editingTransaction = ref(null)

const title = computed(() => `Today's ${props.transactionType} Transactions`)

const transactionClass = computed(() =>
  props.transactionType === 'Cash In' ? 'cash-in' : 'cash-out'
)

const transactionPrefix = computed(() =>
  props.transactionType === 'Cash In' ? '+' : '-'
)

const storeTransactions = computed(() => {
  return props.transactionType === 'Cash In'
    ? props.store.cashInTransactions
    : props.store.cashOutTransactions
})

const todaysTransactions = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return storeTransactions.value
    .filter(t => new Date(t.date) >= today)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalToday = computed(() => {
  return todaysTransactions.value.reduce((sum, t) => sum + t.amount, 0)
})

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const handleEdit = (transaction) => {
  editingTransaction.value = { ...transaction }
  isEditModalOpen.value = true
}

const handleUpdate = async (updatedTransaction) => {
  try {
    if (props.transactionType === 'Cash In') {
      await props.store.updateCashInEntry(updatedTransaction.id, updatedTransaction)
    } else {
      await props.store.updateCashOutEntry(updatedTransaction.id, updatedTransaction)
    }
    isEditModalOpen.value = false
    editingTransaction.value = null
    // Refresh the transactions
    if (props.transactionType === 'Cash In') {
      await props.store.fetchCashInEntries(true)
    } else {
      await props.store.fetchCashOutEntries(true)
    }
  } catch (error) {
    console.error('Error updating transaction:', error)
    // Handle error (e.g., show error message to user)
  }
}

onMounted(async () => {
  if (props.transactionType === 'Cash In') {
    await props.store.fetchCashInEntries(true)
  } else {
    await props.store.fetchCashOutEntries(true)
  }
})
</script>

<style scoped>
.todays-transactions {
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

.transaction-amount.cash-in,
.total-transaction.cash-in {
  color: rgb(0, 185, 0);
}

.transaction-amount.cash-out,
.total-transaction.cash-out {
  color: red;
}

.transaction-notes {
  grid-column: 1 / -1;
  font-style: italic;
  color: #666;
}

.transaction-category {
  grid-column: 1 / -1;
  color: #555;
}

.transaction-summary {
  margin-top: 1rem;
  text-align: right;
}

.total-transaction {
  font-size: 1.2em;
}
</style>