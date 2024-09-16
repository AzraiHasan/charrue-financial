<template>
  <form @submit.prevent="handleSubmit" class="cash-in-form">

    <div class="mb-4 form-group">
      <label for="date">Date:</label>
      <UInput type="date" id="date" v-model="formData.date" required />
    </div>

    <div class="mb-4 form-group">
      <label for="amount">Amount:</label>
      <UInput type="number" id="amount" v-model="formData.amount" min="0" step="0.01" required />
    </div>

    <div class="mb-4 form-group">
      <label for="notes">Notes (optional):</label>
      <UTextarea id="notes" v-model="formData.notes" />
    </div>

    <UButton type="submit" :disabled="!isFormValid">Record Cash In</UButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  date: '',
  amount: '',
  notes: ''
})

const isFormValid = computed(() => {
  return formData.value.date && formData.value.amount > 0
})

const handleSubmit = () => {
  if (isFormValid.value) {
    // TODO: Emit form data to parent component or handle submission logic
    console.log('Form submitted: ', formData.value)
    // Reset form after submission
    formData.value = { date: '', amount: '', notes: '' }
  }
}
</script>
