// stores/cashOutStore.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useDatabase } from "@/composables/useDatabase";

export const useCashOutStore = defineStore("cashOut", () => {
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
  const cashOutTransactions = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const lastFetchTimestamp = ref(null);

  // Getters
  const totalCashOut = computed(() => {
    return cashOutTransactions.value.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  });

  const getCashOutByDateRange = computed(() => (startDate, endDate) => {
    return cashOutTransactions.value.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  });

  const getCashOutByCategory = computed(() => (category) => {
    return cashOutTransactions.value.filter(
      (transaction) => transaction.category === category
    );
  });

  // Actions
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
      error.value = "Failed to fetch cash-out entries: " + err.message;
      console.error("Error fetching cash-out entries:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const addCashOutEntry = async (entry) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Adding cash-out entry:", entry);
      const id = await addItem(STORES.CASH_OUT, entry);
      cashOutTransactions.value.unshift({ ...entry, id });
      console.log("Cash-out entry added successfully with ID:", id);
      return id;
    } catch (err) {
      error.value = "Failed to add cash-out entry: " + err.message;
      console.error("Error adding cash-out entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCashOutEntry = async (id, updates) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Updating cash-out entry:", id, updates);
      await updateItem(STORES.CASH_OUT, id, updates);
      const index = cashOutTransactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        cashOutTransactions.value[index] = {
          ...cashOutTransactions.value[index],
          ...updates,
        };
      }
      console.log("Cash-out entry updated successfully");
    } catch (err) {
      error.value = "Failed to update cash-out entry: " + err.message;
      console.error("Error updating cash-out entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCashOutEntry = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Deleting cash-out entry:", id);
      await deleteItem(STORES.CASH_OUT, id);
      cashOutTransactions.value = cashOutTransactions.value.filter(
        (t) => t.id !== id
      );
      console.log("Cash-out entry deleted successfully");
    } catch (err) {
      error.value = "Failed to delete cash-out entry: " + err.message;
      console.error("Error deleting cash-out entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const syncCashOutData = async (serverData) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Syncing cash-out data");
      await clearStore(STORES.CASH_OUT);
      await bulkAdd(STORES.CASH_OUT, serverData);
      await fetchCashOutEntries(true);
      console.log("Cash-out data synced successfully");
    } catch (err) {
      error.value = "Failed to sync cash-out data: " + err.message;
      console.error("Error syncing cash-out data:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    cashOutTransactions,
    isLoading,
    error,
    // Getters
    totalCashOut,
    getCashOutByDateRange,
    getCashOutByCategory,
    // Actions
    fetchCashOutEntries,
    addCashOutEntry,
    updateCashOutEntry,
    deleteCashOutEntry,
    syncCashOutData,
  };
});
