<!-- components/CashInForm.vue -->

<template>
  <form @submit.prevent="handleSubmit" class="cash-in-form">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">Record Cash In</h2>
      </template>

      <div class="space-y-4">
        <UFormGroup label="Date" name="date">
          <UInput v-model="formData.date" type="date" :max="today" required />
        </UFormGroup>

        <UFormGroup label="Amount" name="amount">
          <UInput v-model.number="formData.amount" type="number" min="0" step="0.01" required />
        </UFormGroup>

        <UFormGroup label="Notes (optional)" name="notes">
          <UTextarea v-model="formData.notes" rows="3" />
        </UFormGroup>
      </div>

      <template #footer>
        <UButton type="submit" color="primary" :loading="cashInStore.isLoading"
          :disabled="!isFormValid || cashInStore.isLoading">
          Record Cash In
        </UButton>
      </template>
    </UCard>
  </form>

  <UModal v-model="showSuccessModal">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Success</h3>
      </template>
      <p>Cash in transaction recorded successfully!</p>
      <template #footer>
        <UButton @click="showSuccessModal = false">Close</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCashInStore } from '@/stores/cashInStore';
import { useNotificationStore } from '@/stores/notificationStore';

const cashInStore = useCashInStore();
const notificationStore = useNotificationStore();

const { error } = storeToRefs(cashInStore);

const formData = ref({
  date: '',
  amount: '',
  notes: ''
});

const showSuccessModal = ref(false);

const today = new Date().toISOString().split('T')[0];

const isFormValid = computed(() => {
  return formData.value.date && formData.value.amount > 0;
});

const resetForm = () => {
  formData.value = {
    date: '',
    amount: '',
    notes: ''
  };
};

const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      await cashInStore.addCashInEntry({
        date: formData.value.date,
        amount: Number(formData.value.amount),
        notes: formData.value.notes
      });

      showSuccessModal.value = true;
      resetForm();
    } catch (err) {
      notificationStore.add({
        type: 'error',
        message: 'Failed to record cash in. Please try again.'
      });
    }
  }
};
</script>