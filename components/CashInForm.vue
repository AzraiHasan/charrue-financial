<!-- components/CashInForm.vue -->

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
    <div class="flex justify-end">
      <UButton type="submit" :disabled="!isFormValid || isSubmitting" size="lg">Record Cash In</UButton>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCashInStore } from '@/stores/cashInStore'

const cashInStore = useCashInStore()

const formData = ref({
  date: '',
  amount: '',
  notes: ''
})

const isSubmitting = ref(false)

const isFormValid = computed(() => {
  return formData.value.date && formData.value.amount > 0
})

const handleSubmit = async () => {
  if (isFormValid.value && !isSubmitting.value) {
    isSubmitting.value = true
    try {
      const entryData = {
        date: formData.value.date,
        amount: Number(formData.value.amount),
        notes: formData.value.notes
      }
      console.log('Submitting form data:', entryData)
      await cashInStore.addCashInEntry(entryData)
      console.log('Form submission successful')
      // Reset form after successful submission
      formData.value = { date: '', amount: '', notes: '' }
    } catch (error) {
      console.error('Error submitting cash-in entry:', error)
    } finally {
      isSubmitting.value = false
    }
  }
}
</script>
