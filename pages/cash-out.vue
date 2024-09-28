<!-- pages/cash-out.vue -->
<template>
  <div class="cash-out-page">
    <h1 class="text-2xl font-bold mb-6">Cash Out</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <CashOutForm />
      </div>

      <div>
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Recent Cash Out Transactions</h2>
          </template>

          <div v-if="cashOutStore.isLoading" class="text-center py-4">
            <ULoader size="lg" />
            <p class="mt-2">Loading recent transactions...</p>
          </div>

          <div v-else-if="cashOutStore.error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">{{ cashOutStore.error }}</span>
          </div>

          <div v-else-if="recentTransactions.length === 0" class="text-center py-4">
            <p>No recent cash out transactions.</p>
          </div>

          <ul v-else class="divide-y divide-gray-200">
            <li v-for="transaction in recentTransactions" :key="transaction.id" class="py-4">
              <div class="flex justify-between">
                <span class="font-medium">{{ formatDate(transaction.date) }}</span>
                <span class="text-red-600 font-medium">${{ transaction.amount.toFixed(2) }}</span>
              </div>
              <div class="text-gray-600 mt-1">
                Category: {{ getCategoryName(transaction.category) }}
              </div>
              <p v-if="transaction.notes" class="text-gray-600 mt-1">{{ transaction.notes }}</p>
            </li>
          </ul>

          <template #footer>
            <UButton @click="loadMoreTransactions" :disabled="cashOutStore.isLoading || !hasMoreTransactions">
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
import { useCashOutStore } from '@/stores/cashOutStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { formatDate } from '@/utils/dateHelpers';
import CashOutForm from '@/components/CashOutForm.vue';

const cashOutStore = useCashOutStore();
const categoryStore = useCategoryStore();
const { cashOutTransactions } = storeToRefs(cashOutStore);

const transactionsLimit = ref(10);
const hasMoreTransactions = computed(() => cashOutTransactions.value.length > transactionsLimit.value);

const recentTransactions = computed(() => {
  return cashOutTransactions.value
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, transactionsLimit.value);
});

const getCategoryName = (categoryId) => {
  const category = categoryStore.getCategoryById(categoryId);
  return category ? category.name : 'Unknown';
};

const loadMoreTransactions = () => {
  transactionsLimit.value += 10;
};

onMounted(async () => {
  if (cashOutTransactions.value.length === 0) {
    await cashOutStore.fetchCashOutEntries();
  }
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories();
  }
});
</script>