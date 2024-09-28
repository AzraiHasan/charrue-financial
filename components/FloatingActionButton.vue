<!-- components/FloatingActionButton.vue -->

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <UPopover :popper="{ placement: 'top-end' }" v-model="isOpen">
      <UButton icon='i-heroicons-pencil-square' color="primary" variant="solid" size="xl" :rounded="true" />

      <template #panel="{ close }">
        <div class="p-4 space-y-2">
          <UButton class="text-xl" block color="green" variant="ghost" @click="handleCashIn(close)"
            :loading="cashInStore.isLoading" :disabled="cashInStore.isLoading">
            <template #leading>
              <UIcon name="i-heroicons-banknotes" />
            </template>
            Record Cash In
          </UButton>
          <UButton class="text-xl" block color="red" variant="ghost" @click="handleCashOut(close)"
            :loading="cashOutStore.isLoading" :disabled="cashOutStore.isLoading || categoryStore.isLoading">
            <template #leading>
              <UIcon name="i-heroicons-receipt-percent" />
            </template>
            Record Cash Out
          </UButton>
          <UButton class="text-xl" block color="blue" variant="ghost" @click="handleSync(close)" :loading="isSyncing"
            :disabled="isSyncing || cashInStore.isLoading || cashOutStore.isLoading || categoryStore.isLoading">
            <template #leading>
              <UIcon name="i-heroicons-arrow-path" />
            </template>
            Sync Data
          </UButton>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCashInStore } from '@/stores/cashInStore';
import { useCashOutStore } from '@/stores/cashOutStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useNotificationStore } from '@/stores/notificationStore';

const router = useRouter();
const cashInStore = useCashInStore();
const cashOutStore = useCashOutStore();
const categoryStore = useCategoryStore();
const notificationStore = useNotificationStore();

const isOpen = ref(false);
const isSyncing = ref(false);

const handleCashIn = (close) => {
  close();
  router.push('/cash-in');
};

const handleCashOut = (close) => {
  close();
  router.push('/cash-out');
};

const handleSync = async (close) => {
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
    close();
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