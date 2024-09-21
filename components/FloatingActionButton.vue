<!-- components/FloatingActionButton.vue -->

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <UPopover :popper="{ placement: 'top-end' }" v-model="isOpen">
      <UButton :ui="{ rounded: 'rounded-full' }" :icon="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-plus'"
        color="primary" variant="solid" size="xl" :rounded="true" aria-label="Open transaction menu"
        @click="togglePopover" />

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
const isOpen = ref(false)
const togglePopover = () => {
  isOpen.value = !isOpen.value
}

const handleCashIn = (close) => {
  close()
  router.push('/cash-in')
}

const handleCashOut = (close) => {
  close()
  router.push('/cash-out')
}
</script>
