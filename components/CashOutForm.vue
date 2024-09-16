<template>
  <form @submit.prevent="handleSubmit" class="cash-out-form">
    <h2>Record Cash Out</h2>

    <div class="form-group">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="formData.date" required>
    </div>

    <div class="form-group">
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model="formData.amount" min="0" step="0.01" required>
    </div>

    <div class="form-group">
      <label for="category">Category:</label>
      <select id="category" v-model="formData.category" required>
        <option value="">Select a category</option>
        <!-- TODO: Populate this list with actual categories -->
        <option value="supplies">Supplies</option>
        <option value="equipment">Equipment</option>
        <option value="rent">Rent</option>
        <option value="utilities">Utilities</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label for="notes">Notes (optional):</label>
      <textarea id="notes" v-model="formData.notes"></textarea>
    </div>

    <button type="submit" :disabled="!isFormValid">Record Cash Out</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  date: '',
  amount: '',
  category: '',
  notes: ''
})

const isFormValid = computed(() => {
  return formData.value.date && formData.value.amount > 0 && formData.value.category
})

const handleSubmit = () => {
  if (isFormValid.value) {
    // TODO: Emit form data to parent component or handle submission logic
    console.log('Form submitted:', formData.value)
    // Reset form after submission
    formData.value = { date: '', amount: '', category: '', notes: '' }
  }
}
</script>

<style scoped>
/* TODO: Add styles for the form layout and elements */
</style>