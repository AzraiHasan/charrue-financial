<!-- components/syncDataBtn.vue -->

<template>
  <button @click="syncData">Sync Data</button>
</template>

<script setup>
import { useMyStore } from '../stores/myStore'

const store = useMyStore()

const syncData = () => {
  store.syncToIndexedDB()
}

return {
  syncData,
}

</script>