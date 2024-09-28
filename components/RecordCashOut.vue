<!-- components/RecordCashOut.vue -->

<template>
  <form @submit.prevent="submitForm">
    <label for="date">Date:</label>
    <input type="date" id="date" v-model="formData.date" required>

    <label for="amount">Amount:</label>
    <input type="number" id="amount" v-model="formData.amount" required>

    <label for="category">Category:</label>
    <select id="category" v-model="formData.category" required>
      <option value="Ingredients">Ingredients</option>
      <option value="Supplies">Supplies</option>
      <option value="Salary">Salary</option>
      <option value="Rent">Rent</option>
      <option value="Utilities">Utilities</option>
      <option value="Others">Others</option>
    </select>

    <label for="notes">Notes:</label>  

    <textarea id="notes" v-model="formData.notes" required></textarea>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { useMyStore } from '@/stores/myStore'

const store = useMyStore()

const formData = {
  date: '',
  amount: '',
  category: '',
  notes: '',
}

const submitForm = () => {
  store.addTransaction({
    type: 'expense',
    ...formData,
  })

  // Clear form data
  formData.date = ''
  formData.amount = ''
  formData.category = ''
  formData.notes = ''
}

return {
  formData,
  submitForm,
}

</script>