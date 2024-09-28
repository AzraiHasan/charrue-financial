<!-- components/Dashboard.vue -->
<template>
  <div>
    <UCard class="mb-4">
      <div>
        <h2 class="text-xl font-semibold mb-4">Cash-in vs Cash-out</h2>
        <DashboardChart />
      </div>
    </UCard>

    <UCard class="mb-4">
      <h2 class="text-xl font-semibold mb-4">Weekly Expenses vs Cash in Hand</h2>
      <FinancialSummaryChart />
    </UCard>

    <UCard class="mb-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="text-lg font-semibold">Total Cash In</h3>
          <p class="text-2xl text-green-600">${{ totalCashIn.toFixed(2) }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold">Total Cash Out</h3>
          <p class="text-2xl text-red-600">${{ totalCashOut.toFixed(2) }}</p>
        </div>
      </div>
    </UCard>

    <UCard class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Cash in Hand</h3>
      <p class="text-2xl" :class="{ 'text-green-600': cashInHand >= 0, 'text-red-600': cashInHand < 0 }">
        ${{ cashInHand.toFixed(2) }}
      </p>
    </UCard>

    <UButton @click="syncData" :loading="isSyncing" :disabled="isLoading || isSyncing">
      Sync Data
    </UButton>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCashInStore } from '@/stores/cashInStore';
import { useCashOutStore } from '@/stores/cashOutStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useNotificationStore } from '@/stores/notificationStore';
import DashboardChart from '@/components/DashboardChart.vue';
import FinancialSummaryChart from '@/components/FinancialSummaryChart.vue';

const cashInStore = useCashInStore();
const cashOutStore = useCashOutStore();
const categoryStore = useCategoryStore();
const notificationStore = useNotificationStore();

const { isLoading: cashInLoading, error: cashInError } = storeToRefs(cashInStore);
const { isLoading: cashOutLoading, error: cashOutError } = storeToRefs(cashOutStore);
const { isLoading: categoryLoading, error: categoryError } = storeToRefs(categoryStore);

const isLoading = computed(() => cashInLoading.value || cashOutLoading.value || categoryLoading.value);
const error = computed(() => cashInError.value || cashOutError.value || categoryError.value);

const totalCashIn = computed(() => cashInStore.totalCashIn);
const totalCashOut = computed(() => cashOutStore.totalCashOut);
const cashInHand = computed(() => totalCashIn.value - totalCashOut.value);

const isSyncing = ref(false);

onMounted(async () => {
  try {
    await Promise.all([
      cashInStore.fetchCashInEntries(),
      cashOutStore.fetchCashOutEntries(),
      categoryStore.fetchCategories()
    ]);
  } catch (err) {
    console.error('Error loading dashboard data:', err);
    notificationStore.add({
      type: 'error',
      message: 'Failed to load dashboard data. Please try again.'
    });
  }
});

const syncData = async () => {
  isSyncing.value = true;
  try {
    // In a real application, you would fetch the latest data from a server here
    const serverData = {
      cashIn: [], // Fetch from server
      cashOut: [], // Fetch from server
      categories: [] // Fetch from server
    };

    await Promise.all([
      cashInStore.syncCashInData(serverData.cashIn),
      cashOutStore.syncCashOutData(serverData.cashOut),
      categoryStore.syncCategoriesData(serverData.categories)
    ]);

    notificationStore.add({
      type: 'success',
      message: 'Data synced successfully'
    });
  } catch (err) {
    console.error('Error syncing data:', err);
    notificationStore.add({
      type: 'error',
      message: 'Failed to sync data. Please try again.'
    });
  } finally {
    isSyncing.value = false;
  }
};
</script>