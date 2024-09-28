<template>
  <form @submit.prevent="handleSubmit" class="cash-in-form">
    <div class="mb-4">
      <label for="date" class="block text-sm font-medium text-gray-700">Date:</label>
      <UInput type="date" id="date" v-model="formData.date" class="mt-1 block w-full" required />
    </div>

    <div class="mb-4">
      <label for="amount" class="block text-sm font-medium text-gray-700">Amount:</label>
      <UInput type="number" id="amount" v-model="formData.amount" class="mt-1 block w-full" min="0" step="0.01"
        required />
    </div>

    <div class="mb-4">
      <label for="notes" class="block text-sm font-medium text-gray-700">Notes (optional):</label>
      <UTextarea id="notes" v-model="formData.notes" class="mt-1 block w-full" rows="3" />
    </div>

    <div class="flex justify-end">
      <UButton type="submit" :disabled="!isFormValid || isSubmitting" :loading="isSubmitting">
        {{ isSubmitting ? 'Recording...' : 'Record Cash In' }}
      </UButton>
    </div>

    <UAlert v-if="submissionError" class="mt-4" color="red" variant="soft" icon="i-heroicons-exclamation-triangle">
      {{ submissionError }}
    </UAlert>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDatabase } from '@/composables/useDatabase'

const { addCashIn } = useDatabase()

const formData = ref({
  date: '',
  amount: '',
  notes: ''
})

const isSubmitting = ref(false)
const submissionError = ref('')

const isFormValid = computed(() => {
  return formData.value.date && parseFloat(formData.value.amount) > 0
})

const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true
  submissionError.value = ''

  try {
    const entryData = {
      date: formData.value.date,
      amount: parseFloat(formData.value.amount),
      notes: formData.value.notes.trim()
    }

    const id = await addCashIn(entryData)

    console.log('Cash-in entry added successfully with ID:', id)

    // Reset form after successful submission
    formData.value = { date: '', amount: '', notes: '' }

    // Emit an event to notify parent component of the new entry
    emit('entry-added', { id, ...entryData })
  } catch (error) {
    console.error('Error submitting cash-in entry:', error)
    submissionError.value = 'Failed to record cash-in. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Emits
const emit = defineEmits(['entry-added'])
</script>

<style scoped>
.cash-in-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>