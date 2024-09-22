// stores/cashOutStore.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useDatabase } from "@/composables/useDatabase";

export const useCashOutStore = defineStore("cashOut", () => {
  const { STORES, addItem, getAllItems, updateItem } = useDatabase();

  const cashOutTransactions = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const lastFetchTimestamp = ref(null);

  const addCashOutEntry = async (entry) => {
    if (isLoading.value) return; // Prevent concurrent additions
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Adding cash-out entry:", entry);
      const id = await addItem(STORES.CASH_OUT, entry);
      console.log("Cash-out entry added with ID:", id);
      cashOutTransactions.value = [
        { ...entry, id },
        ...cashOutTransactions.value,
      ];
      return id;
    } catch (err) {
      error.value = err.message;
      console.error("Error adding cash-out entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCashOutEntries = async (forceRefresh = false) => {
    if (
      !forceRefresh &&
      cashOutTransactions.value.length > 0 &&
      lastFetchTimestamp.value &&
      Date.now() - lastFetchTimestamp.value < 60000
    ) {
      console.log("Using cached cash-out entries");
      return;
    }

    if (isLoading.value) {
      console.log("Fetch already in progress");
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      console.log("Fetching cash-out entries from IndexedDB");
      const items = await getAllItems(STORES.CASH_OUT);
      cashOutTransactions.value = items.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      lastFetchTimestamp.value = Date.now();
      console.log(
        "Fetched and sorted cash-out entries:",
        cashOutTransactions.value
      );
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching cash-out entries:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const totalCashOut = computed(() => {
    return cashOutTransactions.value.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  });

  const updateCashOutEntry = async (id, updates) => {
    if (isLoading.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Updating cash-out entry:", id, updates);

      // Omit the time part from the date string
      const formattedUpdates = {
        ...updates,
        date: updates.date.split("T")[0],
        id,
      };

      await updateItem(STORES.CASH_OUT, id, formattedUpdates);
      const index = cashOutTransactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        cashOutTransactions.value[index] = {
          ...cashOutTransactions.value[index],
          ...formattedUpdates,
        };
      }
      console.log("Cash-out entry updated successfully");
    } catch (err) {
      error.value = err.message;
      console.error("Error updating cash-out entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    cashOutTransactions,
    isLoading,
    error,
    addCashOutEntry,
    fetchCashOutEntries,
    totalCashOut,
    updateCashOutEntry,
  };
});
