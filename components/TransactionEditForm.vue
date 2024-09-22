<!-- components/TransactionEditForm.vue -->
<template>
  <UCard class="p-4">

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <UFormGroup label="Date">
        <UInput disabled v-model="form.date" type="date" />
      </UFormGroup>
      <UFormGroup label="Time">
        <UInput disabled v-model="form.time" type="time" />
      </UFormGroup>
      <UFormGroup label="Amount">
        <UInput v-model.number="form.amount" type="number" step="0.01" />
      </UFormGroup>
      <UFormGroup v-if="showCategory" label="Category">
        <USelect v-model="form.category" :options="categoryOptions" />
      </UFormGroup>
      <UFormGroup label="Notes">
        <UTextarea v-model="form.notes" />
      </UFormGroup>
      <div class="flex justify-end space-x-2">
        <UButton type="button" variant="outline" @click="$emit('cancel')">Cancel</UButton>
        <UButton type="submit" :loading="isSubmitting">Save Changes</UButton>
      </div>
    </form>
  </UCard>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minValue } from '@vuelidate/validators'
import { ru } from 'date-fns/locale';

const props = defineProps({
  transaction: {
    type: Object,
    required: true
  },
  showCategory: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update', 'cancel'])

const parseDateAndTime = (dateValue) => {
  let date = '';
  let time = '';

  if (dateValue) {
    const dateObj = new Date(dateValue);
    if (!isNaN(dateObj.getTime())) {
      date = dateObj.toISOString().split('T')[0];
      time = dateObj.toTimeString().slice(0, 5);
    }
  }

  return { date, time };
}

const { date, time } = parseDateAndTime(props.transaction.date);

const form = ref({
  date: date,
  time: time,
  amount: props.transaction.amount || 0,
  category: props.transaction.category || '',
  notes: props.transaction.notes || ''
})

const isSubmitting = ref(false)

const categoryOptions = [
  { label: 'Ingredients', value: 'Ingredients' },
  { label: 'Supplies', value: 'Supplies' },
  { label: 'Equipment', value: 'Equipment' },
  { label: 'Rent', value: 'Rent' },
  { label: 'Utilities', value: 'Utilities' },
  { label: 'Salary', value: 'Salary' },
  { label: 'Other', value: 'Other' }
]

const rules = computed(() => ({
  date: { required },
  time: { required },
  amount: { required, numeric, minValue: minValue(0) },
  category: props.showCategory ? { required } : {}
}))

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  isSubmitting.value = true
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    isSubmitting.value = false
    return
  }

  try {
    const updatedTransaction = {
      ...props.transaction,
      date: `${form.value.date}T${form.value.time}:00`,
      amount: form.value.amount,
      category: form.value.category,
      notes: form.value.notes
    }
    emit('update', updatedTransaction)
  } catch (error) {
    console.error('Error updating transaction:', error)
    // You can add error handling here, such as displaying an error message to the user
  } finally {
    isSubmitting.value = false
  }
}
</script>