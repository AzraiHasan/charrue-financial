// stores/cashInStore.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useDatabase } from "@/composables/useDatabase";

export const useCashInStore = defineStore("cashIn", () => {
  const {
    STORES,
    addItem,
    getAllItems,
    updateItem,
    deleteItem,
    bulkAdd,
    clearStore,
  } = useDatabase();

  // State
  const cashInTransactions = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const lastFetchTimestamp = ref(null);

  // Getters
  const totalCashIn = computed(() => {
    return cashInTransactions.value.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  });

  const getCashInByDateRange = computed(() => (startDate, endDate) => {
    return cashInTransactions.value.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  });

  // Actions
  const fetchCashInEntries = async (forceRefresh = false) => {
    if (
      !forceRefresh &&
      cashInTransactions.value.length > 0 &&
      lastFetchTimestamp.value &&
      Date.now() - lastFetchTimestamp.value < 60000
    ) {
      console.log("Using cached cash-in entries");
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      console.log("Fetching cash-in entries from IndexedDB");
      const items = await getAllItems(STORES.CASH_IN);
      cashInTransactions.value = items.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      lastFetchTimestamp.value = Date.now();
      console.log(
        "Fetched and sorted cash-in entries:",
        cashInTransactions.value
      );
    } catch (err) {
      error.value = "Failed to fetch cash-in entries: " + err.message;
      console.error("Error fetching cash-in entries:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const addCashInEntry = async (entry) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Adding cash-in entry:", entry);
      const id = await addItem(STORES.CASH_IN, entry);
      cashInTransactions.value.unshift({ ...entry, id });
      console.log("Cash-in entry added successfully with ID:", id);
      return id;
    } catch (err) {
      error.value = "Failed to add cash-in entry: " + err.message;
      console.error("Error adding cash-in entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCashInEntry = async (id, updates) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Updating cash-in entry:", id, updates);
      await updateItem(STORES.CASH_IN, id, updates);
      const index = cashInTransactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        cashInTransactions.value[index] = {
          ...cashInTransactions.value[index],
          ...updates,
        };
      }
      console.log("Cash-in entry updated successfully");
    } catch (err) {
      error.value = "Failed to update cash-in entry: " + err.message;
      console.error("Error updating cash-in entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCashInEntry = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Deleting cash-in entry:", id);
      await deleteItem(STORES.CASH_IN, id);
      cashInTransactions.value = cashInTransactions.value.filter(
        (t) => t.id !== id
      );
      console.log("Cash-in entry deleted successfully");
    } catch (err) {
      error.value = "Failed to delete cash-in entry: " + err.message;
      console.error("Error deleting cash-in entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const syncCashInData = async (serverData) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Syncing cash-in data");
      await clearStore(STORES.CASH_IN);
      await bulkAdd(STORES.CASH_IN, serverData);
      await fetchCashInEntries(true);
      console.log("Cash-in data synced successfully");
    } catch (err) {
      error.value = "Failed to sync cash-in data: " + err.message;
      console.error("Error syncing cash-in data:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    cashInTransactions,
    isLoading,
    error,
    // Getters
    totalCashIn,
    getCashInByDateRange,
    // Actions
    fetchCashInEntries,
    addCashInEntry,
    updateCashInEntry,
    deleteCashInEntry,
    syncCashInData,
  };
});
