<!-- components/RecordCashIn.vue -->

<template>
  <form @submit.prevent="submitForm">
    <label for="date">Date:</label>
    <input type="date" id="date" v-model="formData.date" required>

    <label for="amount">Amount:</label>
    <input type="number" id="amount" v-model="formData.amount" required>

    <label for="notes">Notes:</label>
    <textarea id="notes" v-model="formData.notes"></textarea>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { useMyStore } from '../stores/myStore'

const store = useMyStore()

const formData = {
  date: '',
  amount: '',
  notes: '',
}

const submitForm = () => {
  store.addTransaction({
    type: 'income',
    ...formData,
  })

  // Clear form data
  formData.date = ''
  formData.amount = ''
  formData.notes = ''
}

return {
  formData,
  submitForm,
}

</script>