<!-- components/TestDatabase.vue -->

<template>
  <div>
    <h2>Database Test</h2>
    <UButton @click="initializeDB">Initialize DB</UButton>
    <UButton @click="addTestItem">Add Test Item</UButton>
    <UButton @click="getTestItems">Get Test Items</UButton>
    <div v-if="result">
      <h3>Result:</h3>
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDatabase } from '~/composables/useDatabase'

const { initDB, addItem, getAllItems, STORES } = useDatabase()
const result = ref(null)

const initializeDB = async () => {
  try {
    await initDB()
    result.value = 'Database initialized successfully'
  } catch (error) {
    result.value = `Error initializing DB: ${error.message}`
  }
}

const addTestItem = async () => {
  try {
    const testItem = { date: new Date().toISOString(), amount: 100 }
    const id = await addItem(STORES.CASH_IN, testItem)
    result.value = `Test item added with ID: ${id}`
  } catch (error) {
    result.value = `Error adding test item: ${error.message}`
  }
}

const getTestItems = async () => {
  try {
    const items = await getAllItems(STORES.CASH_IN)
    result.value = items;
  } catch (error) {
    result.value = `Error getting test items: ${error.message}`
  }
}
</script>