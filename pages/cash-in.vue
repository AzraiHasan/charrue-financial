<!-- pages/cash-in.vue -->
<template>
  <div class="cash-in-page">
    <h1 class="text-2xl font-bold mb-6">Cash In</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <CashInForm />
      </div>

      <div>
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Recent Cash In Transactions</h2>
          </template>

          <div v-if="cashInStore.isLoading" class="text-center py-4">
            <ULoader size="lg" />
            <p class="mt-2">Loading recent transactions...</p>
          </div>

          <div v-else-if="cashInStore.error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">{{ cashInStore.error }}</span>
          </div>

          <div v-else-if="recentTransactions.length === 0" class="text-center py-4">
            <p>No recent cash in transactions.</p>
          </div>

          <ul v-else class="divide-y divide-gray-200">
            <li v-for="transaction in recentTransactions" :key="transaction.id" class="py-4">
              <div class="flex justify-between">
                <span class="font-medium">{{ formatDate(transaction.date) }}</span>
                <span class="text-green-600 font-medium">${{ transaction.amount.toFixed(2) }}</span>
              </div>
              <p v-if="transaction.notes" class="text-gray-600 mt-1">{{ transaction.notes }}</p>
            </li>
          </ul>

          <template #footer>
            <UButton @click="loadMoreTransactions" :disabled="cashInStore.isLoading || !hasMoreTransactions">
              Load More
            </UButton>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCashInStore } from '@/stores/cashInStore';
import { formatDate } from '@/utils/dateHelpers';
import CashInForm from '@/components/CashInForm.vue';

const cashInStore = useCashInStore();
const { cashInTransactions } = storeToRefs(cashInStore);

const transactionsLimit = ref(10);
const hasMoreTransactions = computed(() => cashInTransactions.value.length > transactionsLimit.value);

const recentTransactions = computed(() => {
  return cashInTransactions.value
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, transactionsLimit.value);
});

const loadMoreTransactions = () => {
  transactionsLimit.value += 10;
};

onMounted(async () => {
  if (cashInTransactions.value.length === 0) {
    await cashInStore.fetchCashInEntries();
  }
});
</script>