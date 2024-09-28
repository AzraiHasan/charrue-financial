<script setup>
import { ref } from 'vue'
import { useMyStore } from '../stores/myStore'

const store = useMyStore()

const formData = ref({
  date: '',
  amount: '',
  notes: '',
})

const submitForm = () => {
  store.addTransaction({
    type: 'income',
    date: formData.value.date,
    amount: parseFloat(formData.value.amount),
    notes: formData.value.notes,
  })

  // Clear form data
  formData.value = {
    date: '',
    amount: '',
    notes: '',
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="date">Date:</label>
    <input type="date" id="date" v-model="formData.date" required>

    <label for="amount">Amount:</label>
    <input type="number" id="amount" v-model="formData.amount" step="0.01" required>

    <label for="notes">Notes:</label>
    <textarea id="notes" v-model="formData.notes"></textarea>

    <button type="submit">Submit</button>
  </form>
</template>