<script setup>
import { useMyStore } from '~/stores/myStore';

const store = useMyStore()
const isClient = ref(false)

onMounted(() => {
  isClient.value = true
  store.initializeStore()
})

const syncToIndexedDB = async () => {
  await initDB()
  await store.syncToIndexedDB()
  alert('Data saved to IndexedDB!')
}
</script>

<template>
  <div>
    <h1>Cash Flow Manager</h1>

    <h2>Record Transaction</h2>
    <div style="display: flex; gap: 20px;">
      <div>
        <h3>Cash In</h3>
        <RecordCashIn />
      </div>
      <div>
        <h3>Cash Out</h3>
        <RecordCashOut />
      </div>
    </div>

    <h2>Transactions</h2>
    <template v-if="isClient">
      <ul>
        <li v-for="transaction in store.transactions" :key="transaction.id">
          {{ transaction.type === 'income' ? 'Cash In' : 'Cash Out' }}:
          ${{ transaction.amount }} on {{ transaction.date }}
          ({{ transaction.category || 'N/A' }})
          <p>{{ transaction.notes }}</p>
          <small>{{ transaction.synced ? 'Synced' : 'Not synced' }}</small>
        </li>
      </ul>
      <button @click="syncToIndexedDB">Sync Data</button>
    </template>
    <template v-else>
      <p>Loading transactions...</p>
    </template>
  </div>
</template>
