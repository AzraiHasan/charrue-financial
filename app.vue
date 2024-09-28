<script setup>
import { ref, onMounted } from 'vue'
import { useMyStore } from '~/stores/myStore'

const store = useMyStore()
const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})
</script>

<template>
  <div>
    <h1>Cash Flow Transactions</h1>
    <template v-if="isClient">
      <ul>
        <li v-for="transaction in store.transactions" :key="transaction.id">
          {{ transaction.type === 'income' ? 'Cash In' : 'Cash Out' }}:
          ${{ transaction.amount }} on {{ transaction.date }}
          ({{ transaction.category || 'N/A' }})
          <p>{{ transaction.notes }}</p>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>Loading transactions...</p>
    </template>
    <NuxtPage />
  </div>
</template>