// stores/cashInStore.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useDatabase } from "@/composables/useDatabase";

export const useCashInStore = defineStore("cashIn", () => {
  const { STORES, addItem, getAllItems, updateItem } = useDatabase();
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
    // If data is already loaded and no force refresh, return early
    if (
      !forceRefresh &&
      cashInTransactions.value.length > 0 &&
      lastFetchTimestamp.value &&
      Date.now() - lastFetchTimestamp.value < 60000
    ) {
      console.log("Using cached cash-in entries");
      return;
    }

    if (isLoading.value) {
      console.log("Fetch already in progress");
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      console.log("Fetching cash-in entries from IndexedDB");
      const items = await getAllItems(STORES.CASH_IN);
      cashInTransactions.value = items.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ); // Sort by date, newest first
      lastFetchTimestamp.value = Date.now();
      console.log(
        "Fetched and sorted cash-in entries:",
        cashInTransactions.value
      );
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching cash-in entries:", err);
    } finally {
      isLoading.value = false;
    }
  };
  function serializeData(data) {
    return JSON.parse(JSON.stringify(data));
  }
  const addCashInEntry = async (entry) => {
    if (isLoading.value) return; // Prevent concurrent additions
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Adding cash-in entry:", entry);
      const id = await addItem(STORES.CASH_IN, entry);
      console.log("Entry added with ID:", id);
      cashInTransactions.value.push({ ...entry, id });
      return id;
    } catch (err) {
      error.value = err.message;
      console.error("Error adding cash-in entry:", err);
      throw err; // Rethrow to handle in the component
    } finally {
      isLoading.value = false;
    }
  };

  const updateCashInEntry = async (id, updates) => {
    if (isLoading.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Updating cash-in entry:", id, updates);

      // Omit the time part from the date string
      const formattedUpdates = {
        ...updates,
        date: updates.date.split("T")[0],
        id,
      };

      await updateItem(STORES.CASH_IN, id, formattedUpdates);
      const index = cashInTransactions.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        cashInTransactions.value[index] = {
          ...cashInTransactions.value[index],
          ...formattedUpdates,
        };
      }
      console.log("Cash-in entry updated successfully");
    } catch (err) {
      error.value = err.message;
      console.error("Error updating cash-in entry:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCashInEntry = async (id) => {
    // TODO: Implement deleting a cash in entry
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
  };
});
