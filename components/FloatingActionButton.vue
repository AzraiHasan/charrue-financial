<!-- components/FloatingActionButton.vue -->

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <UPopover :popper="{ placement: 'top-end' }">
      <UButton icon="i-heroicons-plus" color="primary" variant="solid" size="xl" :rounded="true"
        aria-label="Open transaction menu" />

      <template #panel="{ close }">
        <div class="p-4 space-y-2">
          <UButton class="text-xl" block color="green" variant="ghost" @click="handleCashIn(close)">
            <template #leading>
              <UIcon name="i-heroicons-banknotes" />
            </template>
            Record Cash In
          </UButton>
          <UButton class="text-xl" block color="red" variant="ghost" @click="handleCashOut(close)">
            <template #leading>
              <UIcon name="i-heroicons-receipt-percent" />
            </template>
            Record Cash Out
          </UButton>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleCashIn = (close) => {
  close()
  router.push('/cash-in')
}

const handleCashOut = (close) => {
  close()
  router.push('/cash-out')
}
</script>
