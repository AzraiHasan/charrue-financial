<!-- components/CashOutForm.vue -->

<template>
  <form @submit.prevent="handleSubmit" class="cash-out-form">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">Record Cash Out</h2>
      </template>

      <div class="space-y-4">
        <UFormGroup label="Date" name="date">
          <UInput v-model="formData.date" type="date" :max="today" required />
        </UFormGroup>

        <UFormGroup label="Amount" name="amount">
          <UInput v-model.number="formData.amount" type="number" min="0" step="0.01" required />
        </UFormGroup>

        <UFormGroup label="Category" name="category">
          <USelect v-model="formData.category" :options="categoryOptions" required />
        </UFormGroup>

        <UFormGroup label="Notes (optional)" name="notes">
          <UTextarea v-model="formData.notes" rows="3" />
        </UFormGroup>
      </div>

      <template #footer>
        <UButton type="submit" color="primary" :loading="cashOutStore.isLoading"
          :disabled="!isFormValid || cashOutStore.isLoading || categoryStore.isLoading">
          Record Cash Out
        </UButton>
      </template>
    </UCard>
  </form>

  <UModal v-model="showSuccessModal">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Success</h3>
      </template>
      <p>Cash out transaction recorded successfully!</p>
      <template #footer>
        <UButton @click="showSuccessModal = false">Close</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCashOutStore } from '@/stores/cashOutStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useNotificationStore } from '@/stores/notificationStore';

const cashOutStore = useCashOutStore();
const categoryStore = useCategoryStore();
const notificationStore = useNotificationStore();

const { error: cashOutError } = storeToRefs(cashOutStore);
const { error: categoryError } = storeToRefs(categoryStore);

const formData = ref({
  date: '',
  amount: '',
  category: '',
  notes: ''
});

const showSuccessModal = ref(false);

const today = new Date().toISOString().split('T')[0];

const isFormValid = computed(() => {
  return formData.value.date && formData.value.amount > 0 && formData.value.category;
});

const categoryOptions = computed(() => {
  return categoryStore.sortedCategories.map(category => ({
    label: category.name,
    value: category.id
  }));
});

const resetForm = () => {
  formData.value = {
    date: '',
    amount: '',
    category: '',
    notes: ''
  };
};

const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      await cashOutStore.addCashOutEntry({
        date: formData.value.date,
        amount: Number(formData.value.amount),
        category: formData.value.category,
        notes: formData.value.notes
      });

      showSuccessModal.value = true;
      resetForm();
    } catch (err) {
      notificationStore.add({
        type: 'error',
        message: 'Failed to record cash out. Please try again.'
      });
    }
  }
};

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
  } catch (err) {
    notificationStore.add({
      type: 'error',
      message: 'Failed to load categories. Please refresh the page.'
    });
  }
});
</script>