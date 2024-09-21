<!-- components/CashOutForm.vue -->

<template>
  <form @submit.prevent="handleSubmit" class="cash-out-form">
    <div class="mb-4 form-group">
      <label for="date">Date:</label>
      <UInput type="date" id="date" size="xl" v-model="formData.date" required />
    </div>

    <div class="mb-4 form-group">
      <label for="amount">Amount:</label>
      <UInput type="number" id="amount" size="xl" v-model="formData.amount" min="0" step="0.01" required />
    </div>

    <div class="mb-4 form-group">
      <label for="category">Category:</label>
      <USelect id="category" v-model="formData.category" :options="categories" required />
    </div>

    <div class="mb-4 form-group">
      <label for="notes">Notes (optional):</label>
      <UTextarea id="notes" v-model="formData.notes" />
    </div>
    <div class="flex justify-end mt-6">
      <UButton type="submit" :disabled="!isFormValid || isSubmitting" size="lg">Record Cash Out</UButton>
    </div>
  </form>
</template>

<script setup>
const cashOutStore = useCashOutStore()

const categories = ['Ingredients', 'Supplies', 'Equipment', 'Rent', 'Utilities', 'Salary', 'Other']

const formData = ref({
  date: '',
  amount: '',
  category: '',
  notes: ''
})

const isSubmitting = ref(false)

const isFormValid = computed(() => {
  return formData.value.date &&
    formData.value.amount > 0 &&
    formData.value.category
})

const handleSubmit = async () => {
  if (isFormValid.value && !isSubmitting.value) {
    isSubmitting.value = true
    try {
      const entryData = {
        date: formData.value.date,
        amount: Number(formData.value.amount),
        category: formData.value.category,
        notes: formData.value.notes
      }
      console.log('Submitting cash-out form data:', entryData)
      await cashOutStore.addCashOutEntry(entryData)
      console.log('Cash-out form submission successful')
      // Reset form after successful submission
      formData.value = { date: '', amount: '', category: '', notes: '' }
    } catch (error) {
      console.error('Error submitting cash-out entry:', error)
    } finally {
      isSubmitting.value = false
    }
  }
}
</script>